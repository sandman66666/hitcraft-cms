import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5175;

// Ensure data directory and file exist
const dataDir = join(__dirname, 'src/data');
const contentFile = join(dataDir, 'landing-page.json');
const templateFile = join(dataDir, 'initial-landing-page.json');

function ensureDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  if (!fs.existsSync(contentFile) && fs.existsSync(templateFile)) {
    fs.copyFileSync(templateFile, contentFile);
  }

  if (!fs.existsSync(contentFile)) {
    // Fallback default data if template doesn't exist
    const defaultData = {
      hero: {
        title: "Welcome to HitCraft",
        subtitle: "AI-Powered Music Creation Partner",
        description: "Your creative companion for music production.",
        button: { text: "Try HitCraft" },
        secondaryButton: { text: "Learn More" }
      },
      mainValue: {
        title: "Music Creation Made Simple",
        subtitle: "Your Complete Music Creation Partner",
        description: "Get started with HitCraft today.",
        features: ["Feature 1", "Feature 2", "Feature 3"]
      },
      socialProof: {
        title: "What People Say",
        subtitle: "Join the Community",
        testimonials: [{ text: "Sample testimonial", author: "John Doe", role: "Musician" }]
      },
      features: {
        preTitle: "Features",
        title: "What We Offer",
        description: "Discover our features",
        items: [{ title: "Feature 1", description: "Description 1" }]
      }
    };
    fs.writeFileSync(contentFile, JSON.stringify(defaultData, null, 2));
  }
}

// Ensure data file exists before starting server
ensureDataFile();

// Serve static files from the dist directory
app.use(express.static(join(__dirname, 'dist')));

// API endpoints
app.get('/api/get-content', (req, res) => {
  try {
    ensureDataFile(); // Ensure file exists before reading
    const content = JSON.parse(fs.readFileSync(contentFile, 'utf8'));
    res.json(content);
  } catch (error) {
    console.error('Error reading content:', error);
    res.status(500).json({ error: 'Error reading content' });
  }
});

app.post('/api/save-content', express.json(), (req, res) => {
  try {
    const { content } = req.body;
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
    if (fs.existsSync(contentFile)) {
      fs.copyFileSync(contentFile, backupPath);
    }

    // Save new content
    fs.writeFileSync(contentFile, JSON.stringify(content, null, 2));
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
