import type { Request, Response, NextFunction } from 'express-serve-static-core';

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const { Content } = require('./models/Content');
const { Backup } = require('./models/Backup');

dotenv.config();

const app = express();
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hitcraft';

// MongoDB Connection with retry logic
const connectDB = async (retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      const options = {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      };

      const conn = await mongoose.connect(MONGODB_URI, options);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (err) {
      console.error(`MongoDB connection attempt ${i + 1} failed:`, err);
      console.error('Connection URI:', MONGODB_URI.replace(/\/\/[^@]+@/, '//***:***@'));
      if (i === retries - 1) throw err;
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

// API Routes
app.post('/api/save-content', async (req: Request, res: Response) => {
  try {
    const { content } = req.body;

    // Create backup of current content
    const currentContent = await Content.findOne({ isActive: true }).sort({ createdAt: -1 });
    if (currentContent) {
      await new Backup({ content: currentContent.content }).save();
      // Deactivate the current content
      currentContent.isActive = false;
      await currentContent.save();
    }

    // Save new content
    const newContent = new Content({ content });
    await newContent.save();

    res.json({ success: true });
  } catch (error) {
    console.error('Error saving content:', error);
    res.status(500).json({ success: false, error: 'Failed to save content' });
  }
});

app.get('/api/get-content', async (_req: Request, res: Response) => {
  try {
    // Get the most recent active content
    const content = await Content.findOne({ isActive: true }).sort({ createdAt: -1 });
    res.json(content);
  } catch (error) {
    console.error('Error getting content:', error);
    res.status(500).json({ error: 'Failed to get content' });
  }
});

app.get('/api/get-backups', async (_req: Request, res: Response) => {
  try {
    const backups = await Backup.find().sort({ createdAt: -1 });
    res.json(backups);
  } catch (error) {
    console.error('Error getting backups:', error);
    res.status(500).json({ error: 'Failed to get backups' });
  }
});

// Serve static files from the vite build output
const clientPath = path.join(process.cwd(), 'dist/client');
app.use(express.static(clientPath));

// Serve index.html for client-side routing
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;

// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});

module.exports = { app };