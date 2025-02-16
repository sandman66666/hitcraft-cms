import type { Request, Response, NextFunction } from 'express-serve-static-core';

const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const { Content } = require('./models/Content');
const { Backup } = require('./models/Backup');
const { MongoContent } = require('./models/MongoContent');
const { sequelize, connectMongo, migrateMongoToPostgres } = require('./config/database');

// Load environment variables

dotenv.config();

const app = express();
app.use(express.json());

// Load initial content from JSON file
const loadInitialContent = async () => {
  try {
    const initialContentPath = path.join(process.cwd(), 'dist/data/landing-page.json');
    if (!fs.existsSync(initialContentPath)) {
      console.warn('Initial content file not found:', initialContentPath);
      return;
    }

    const initialContent = JSON.parse(fs.readFileSync(initialContentPath, 'utf8'));
    
    // Check if any content exists
    const contentCount = await Content.count();

    if (contentCount === 0) {
      console.log('No content found in database, loading initial content...');
      await Content.create({ content: initialContent, isActive: true });
      console.log('Initial content loaded successfully');
    } else {
      // Ensure there is an active content
      const activeContent = await Content.findOne({ where: { isActive: true } });
      if (!activeContent) {
        console.log('No active content found, activating most recent content...');
        const latestContent = await Content.findOne({
          order: [['createdAt', 'DESC']]
        });
        if (latestContent) {
          latestContent.isActive = true;
          await latestContent.save();
          console.log('Most recent content activated');
        } else {
          console.log('Loading initial content as fallback...');
          await Content.create({ content: initialContent, isActive: true });
          console.log('Initial content loaded successfully');
        }
      }
    }
  } catch (error) {
    console.error('Error loading initial content:', error);
    throw error;
  }
};

// Database Connection
const initializeDatabase = async () => {
  try {
    // Connect to PostgreSQL first
    await sequelize.authenticate();
    console.log('PostgreSQL connection established successfully.');
    
    // Sync PostgreSQL models
    await sequelize.sync({ force: true });
    console.log('Database models synchronized successfully (with force)');
    
    // Load initial content if needed
    await loadInitialContent();

    // Try to connect to MongoDB in the background
    connectMongo().then(async () => {
      console.log('MongoDB connection established successfully.');
      // Attempt migration in the background
      try {
        await migrateMongoToPostgres(Content, MongoContent);
        console.log('MongoDB data migration completed successfully');
      } catch (migrationError: unknown) {
        console.warn('MongoDB migration failed:', migrationError instanceof Error ? migrationError.message : migrationError);
      }
    }).catch((mongoError: unknown) => {
      console.warn('MongoDB connection failed, continuing with PostgreSQL only:', mongoError instanceof Error ? mongoError.message : mongoError);
    });
    
    // Log database configuration
    console.log('Database configuration:', {
      environment: process.env.NODE_ENV,
      dialect: sequelize.getDialect(),
      host: sequelize.config.host,
      database: sequelize.config.database,
      ssl: !!sequelize.config.dialectOptions?.ssl
    });
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
    res.json({ content: content?.content || null });
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