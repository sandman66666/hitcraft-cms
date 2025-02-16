import type { Request, Response, NextFunction } from 'express-serve-static-core';

const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { Content } = require('./models/Content');
const { Backup } = require('./models/Backup');
const sequelize = require('./config/database').default;

dotenv.config();

const app = express();
app.use(express.json());

// Database Connection
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Sync all models with database
    await sequelize.sync();
    console.log('Database models synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

// API Routes
app.post('/api/save-content', async (req: Request, res: Response) => {
  try {
    const { content } = req.body;

    // Create backup of current content
    const currentContent = await Content.findOne({
      where: { isActive: true },
      order: [['createdAt', 'DESC']]
    });

    if (currentContent) {
      await Backup.create({ content: currentContent.content });
      // Deactivate the current content
      currentContent.isActive = false;
      await currentContent.save();
    }

    // Save new content
    await Content.create({ content, isActive: true });

    res.json({ success: true });
  } catch (error) {
    console.error('Error saving content:', error);
    res.status(500).json({ success: false, error: 'Failed to save content' });
  }
});

app.get('/api/get-content', async (_req: Request, res: Response) => {
  try {
    // Get the most recent active content
    const content = await Content.findOne({
      where: { isActive: true },
      order: [['createdAt', 'DESC']]
    });
    res.json(content);
  } catch (error) {
    console.error('Error getting content:', error);
    res.status(500).json({ error: 'Failed to get content' });
  }
});

app.get('/api/get-backups', async (_req: Request, res: Response) => {
  try {
    const backups = await Backup.findAll({
      order: [['createdAt', 'DESC']]
    });
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

// Initialize database and start server
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});

module.exports = { app };