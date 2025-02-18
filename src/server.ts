import type { Request, Response, NextFunction } from 'express-serve-static-core';
const express = require('express');
const cors = require('cors');
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { sequelize, connectDB } from './config/sequelize';
import { Content } from './models/Content';
import { Backup } from './models/Backup';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// Configure CORS
const corsOptions = {
  origin: process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : process.env.VITE_APP_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400
};

app.use(cors(corsOptions));

import { LandingPageContent } from './types/landing';

// Validate content structure
const validateContentStructure = (content: any): content is LandingPageContent => {
  if (!content) {
    console.error('Content is null or undefined');
    return false;
  }

  // Check required sections
  const requiredSections = ['hero', 'mainValue', 'coreBenefits', 'writingPartner', 'produceSong', 'uniqueApproach', 'socialProof', 'callToAction'];
  const missingKeys = requiredSections.filter(key => !content[key]);
  if (missingKeys.length > 0) {
    console.error(`Missing required sections: ${missingKeys.join(', ')}`);
    return false;
  }

  // Validate button text in each section
  const sectionsWithButtons = ['hero', 'mainValue', 'writingPartner', 'produceSong', 'uniqueApproach', 'callToAction'];
  const missingButtonText = sectionsWithButtons.filter(section => {
    const button = content[section]?.button;
    if (!button) {
      console.log(`Adding default button to section: ${section}`);
      content[section].button = { text: "Let's Go" };
      return false;
    }
    if (typeof button.text !== 'string' || !button.text.trim()) {
      console.log(`Setting default button text for section: ${section}`);
      button.text = "Let's Go";
      return false;
    }
    return false;
  });

  // Log successful validation
  console.log('Content structure validation passed');
  return true;
};

// Load initial content from JSON file
const loadInitialContent = async () => {
  try {
    const initialContentPath = path.join(process.cwd(), 'dist/data/landing-page.json');
    if (!fs.existsSync(initialContentPath)) {
      console.warn('Initial content file not found:', initialContentPath);
      return;
    }

    const initialContent = JSON.parse(fs.readFileSync(initialContentPath, 'utf8'));
    
    // Validate initial content structure
    if (!validateContentStructure(initialContent)) {
      console.error('Invalid initial content structure');
      return;
    }
    
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

// Initialize database and load content
const initializeDatabase = async () => {
  try {
    await connectDB();
    await loadInitialContent();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

// Create API router
const apiRouter = express.Router();

// API Routes
apiRouter.post('/save-content', async (req: Request, res: Response) => {
  try {
    const { content } = req.body;

    // Validate content structure before saving
    if (!validateContentStructure(content)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid content structure. Check server logs for details.' 
      });
    }

    // Create backup of current content
    const currentContent = await Content.findOne({
      where: { isActive: true },
      order: [['createdAt', 'DESC']]
    });

    if (currentContent) {
      try {
        await Backup.create({ 
          content: currentContent.content,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        // Deactivate the current content
        currentContent.isActive = false;
        await currentContent.save();
      } catch (backupError) {
        console.error('Error creating backup:', backupError);
        return res.status(500).json({ 
          success: false, 
          error: 'Failed to create backup' 
        });
      }
    }

    // Save new content
    await Content.create({ content, isActive: true });

    res.json({ success: true });
  } catch (error) {
    console.error('Error saving content:', error);
    res.status(500).json({ success: false, error: 'Failed to save content' });
  }
});

apiRouter.get('/get-content', async (_req: Request, res: Response) => {
  try {
    // Get the most recent active content
    const content = await Content.findOne({
      where: { isActive: true },
      order: [['createdAt', 'DESC']]
    });

    let contentToSend = content?.content;

    // Validate content structure
    if (contentToSend && !validateContentStructure(contentToSend)) {
      console.error('Invalid content structure in database, loading initial content');
      const initialContentPath = path.join(process.cwd(), 'dist/data/landing-page.json');
      if (fs.existsSync(initialContentPath)) {
        contentToSend = JSON.parse(fs.readFileSync(initialContentPath, 'utf8'));
        if (!validateContentStructure(contentToSend)) {
          console.error('Invalid initial content structure');
          contentToSend = null;
        }
      } else {
        contentToSend = null;
      }
    }

    res.json({ content: contentToSend });
  } catch (error) {
    console.error('Error getting content:', error);
    res.status(500).json({ error: 'Failed to get content' });
  }
});

apiRouter.get('/get-backups', async (_req: Request, res: Response) => {
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

// Mount API router
app.use('/api', apiRouter);

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

const PORT = process.env.PORT || 5176;

// Initialize database and start server
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});

export { app };