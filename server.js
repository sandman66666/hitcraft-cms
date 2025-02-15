import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5175;

// Serve static files from the dist directory
app.use(express.static(join(__dirname, 'dist')));

// API endpoints
app.get('/api/get-content', (req, res) => {
  try {
    const content = JSON.parse(fs.readFileSync(join(__dirname, 'src/data/landing-page.json'), 'utf8'));
    res.json(content);
  } catch (error) {
    console.error('Error reading content:', error);
    res.status(500).json({ error: 'Error reading content' });
  }
});

app.post('/api/save-content', express.json(), (req, res) => {
  try {
    const { content } = req.body;
    const dataDir = join(__dirname, 'src/data');
    const backupsDir = join(dataDir, 'backups');

    // Ensure directories exist
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(backupsDir)) {
      fs.mkdirSync(backupsDir, { recursive: true });
    }

    // Create backup
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const backupPath = join(backupsDir, `landing-page-${timestamp}.json`);
    if (fs.existsSync(join(dataDir, 'landing-page.json'))) {
      fs.copyFileSync(
        join(dataDir, 'landing-page.json'),
        backupPath
      );
    }

    // Save new content
    fs.writeFileSync(
      join(dataDir, 'landing-page.json'),
      JSON.stringify(content, null, 2)
    );

    res.json({ success: true, backupFile: backupPath });
  } catch (error) {
    console.error('Error saving content:', error);
    res.status(500).json({ error: 'Error saving content' });
  }
});

// For all other routes, serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
