import express, { Request, Response, NextFunction, Application } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import { config } from 'dotenv';
import Content from './models/Content';
import Backup from './models/Backup';

config();

const app: Application = express();
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hitcraft';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err: Error) => console.error('MongoDB connection error:', err));

// Add logging middleware
app.use((req: Request, res: Response, next: NextFunction): void => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Get content endpoint
app.get('/api/get-content', async (req: Request, res: Response): Promise<void> => {
  try {
    const content = await Content.findOne().sort({ createdAt: -1 });
    if (!content) {
      return res.status(404).json({ error: 'No content found' });
    }
    res.json(content.content);
  } catch (error: unknown) {
    console.error('Error reading content:', error);
    res.status(500).json({ error: 'Error reading content' });
  }
});

// Save content endpoint
app.post('/api/save-content', async (req: Request, res: Response): Promise<void> => {
  try {
    const { content } = req.body;
    
    // Create backup of current content
    const currentContent = await Content.findOne().sort({ createdAt: -1 });
    if (currentContent) {
      await Backup.create({
        content: currentContent.content,
        createdAt: new Date()
      });
    }

    // Save new content
    await Content.create({ content });

    res.json({ success: true });
  } catch (error: unknown) {
    console.error('Error saving content:', error);
    res.status(500).json({ error: 'Error saving content' });
  }
});

// Get backups endpoint
app.get('/api/get-backups', async (req: Request, res: Response): Promise<void> => {
  try {
    const backups = await Backup.find().sort({ createdAt: -1 }).limit(10);
    res.json(backups);
  } catch (error: unknown) {
    console.error('Error getting backups:', error);
    res.status(500).json({ error: 'Error getting backups' });
  }
});

// Restore backup endpoint
app.post('/api/restore-backup/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const backup = await Backup.findById(req.params.id);
    if (!backup) {
      return res.status(404).json({ error: 'Backup not found' });
    }

    // Save current content as backup
    const currentContent = await Content.findOne().sort({ createdAt: -1 });
    if (currentContent) {
      await Backup.create({
        content: currentContent.content,
        createdAt: new Date()
      });
    }

    // Restore backup as current content
    await Content.create({ content: backup.content });

    res.json({ success: true });
  } catch (error: unknown) {
    console.error('Error restoring backup:', error);
    res.status(500).json({ error: 'Error restoring backup' });
  }
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Export the configured app
export { app };

// For standalone usage (e.g., testing)
if (process.env.NODE_ENV === 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}