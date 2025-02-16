import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from 'mongoose';
import { Content } from './src/models/Content.js';
import { Backup } from './src/models/Backup.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5175;

// MongoDB Connection with retry logic
const connectDB = async (retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hitcraft');
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (err) {
      console.error(`MongoDB connection attempt ${i + 1} failed:`, err);
      if (i === retries - 1) throw err;
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

// Connect to MongoDB
connectDB().catch(console.error);

// Serve static files from the dist directory
app.use(express.static(join(__dirname, 'dist')));
app.use(express.json());

// API endpoints
app.get('/api/get-content', async (req, res) => {
  try {
    // Get the most recent active content
    const content = await Content.findOne({ isActive: true }).sort({ createdAt: -1 });
    
    if (!content) {
      // If no content exists, create initial content
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
      
      const newContent = new Content({ content: defaultData });
      await newContent.save();
      return res.json(newContent);
    }
    
    res.json(content);
  } catch (error) {
    console.error('Error getting content:', error);
    res.status(500).json({ error: 'Failed to get content' });
  }
});

app.post('/api/save-content', async (req, res) => {
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

app.get('/api/get-backups', async (req, res) => {
  try {
    const backups = await Backup.find().sort({ createdAt: -1 });
    res.json(backups);
  } catch (error) {
    console.error('Error getting backups:', error);
    res.status(500).json({ error: 'Failed to get backups' });
  }
});

// For all other routes, serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
