import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { Content } from './models/Content';
import { Backup } from './models/Backup';

dotenv.config();

const app = express();
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hitcraft';

// Only connect to MongoDB if we're not building
if (process.env.NODE_ENV !== 'build') {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
}

// API Routes
app.post('/api/save-content', async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
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
    const content = await Content.findOne().sort({ createdAt: -1 });
    res.json(content);
  } catch (error) {
    console.error('Error getting content:', error);
    res.status(500).json({ error: 'Failed to get content' });
  }
});

app.post('/api/create-backup', async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const backup = new Backup({ content });
    await backup.save();
    res.json({ success: true });
  } catch (error) {
    console.error('Error creating backup:', error);
    res.status(500).json({ success: false, error: 'Failed to create backup' });
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

// Serve static files from the dist/client directory
const clientPath = path.resolve(__dirname, '..', 'client');
console.log('Current directory:', __dirname);
console.log('Client path:', clientPath);
console.log('Directory exists:', fs.existsSync(clientPath));
if (fs.existsSync(clientPath)) {
  console.log('Directory contents:', fs.readdirSync(clientPath));
}

// Only serve static files if we're not building
if (process.env.NODE_ENV !== 'build') {
  if (fs.existsSync(clientPath)) {
    console.log('Serving static files from:', clientPath);
    app.use(express.static(clientPath));
    
    // Fallback route: serve index.html for all non-API routes
    app.get('*', (_req: Request, res: Response) => {
      const indexPath = path.join(clientPath, 'index.html');
      console.log('Index path:', indexPath);
      console.log('Index exists:', fs.existsSync(indexPath));
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('index.html not found');
      }
    });
  } else {
    console.error('Client directory does not exist');
  }
}

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Only start the server if we're not building
if (process.env.NODE_ENV !== 'build') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export { app };