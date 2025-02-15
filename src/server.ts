import express, { Request, Response, NextFunction, Application } from 'express';
import fs from 'fs/promises';
import path from 'path';

const app: Application = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Add logging middleware
app.use((req: Request, res: Response, next: NextFunction): void => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Get content endpoint
app.get('/api/get-content', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log('Received request to get-content endpoint');

  try {
    const landingPagePath = path.join(process.cwd(), 'src', 'data', 'landing-page.json');
    const content = await fs.readFile(landingPagePath, 'utf8');
    
    res.status(200).json(JSON.parse(content));
  } catch (error: unknown) {
    console.error('Error in get-content API:', error);
    next(error);
  }
});

// Save content endpoint
app.post('/api/save-content', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log('Received request to save-content endpoint');

  try {
    const { content } = req.body;
    if (!content) {
      res.status(400).json({ message: 'Content is required' });
      return;
    }

    const landingPagePath = path.join(process.cwd(), 'src', 'data', 'landing-page.json');
    
    // Create a backup before saving
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(process.cwd(), 'src', 'data', 'backups');
    const backupFile = path.join(backupDir, `landing-page-${timestamp}.json`);
    
    // Ensure backup directory exists
    await fs.mkdir(backupDir, { recursive: true });
    
    // Create backup
    if (await fs.access(landingPagePath).then(() => true).catch(() => false)) {
      await fs.copyFile(landingPagePath, backupFile);
    }

    // Save the new content
    await fs.writeFile(landingPagePath, JSON.stringify(content, null, 2), 'utf8');
    
    console.log('Content saved successfully');
    res.status(200).json({ message: 'Content saved successfully' });
  } catch (error: unknown) {
    console.error('Error in save-content API:', error);
    next(error);
  }
});

// Create backup endpoint
app.post('/api/create-backup', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log('Received request to create-backup endpoint');

  try {
    const { content } = req.body;
    if (!content) {
      res.status(400).json({ message: 'Content is required' });
      return;
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(process.cwd(), 'src', 'data', 'backups');
    const backupFile = path.join(backupDir, `landing-page-${timestamp}.json`);
    
    // Ensure backup directory exists
    await fs.mkdir(backupDir, { recursive: true });
    
    // Create backup
    await fs.writeFile(backupFile, JSON.stringify(content, null, 2), 'utf8');
    
    res.status(200).json({ message: 'Backup created successfully', backupFile });
  } catch (error: unknown) {
    console.error('Error in create-backup API:', error);
    next(error);
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