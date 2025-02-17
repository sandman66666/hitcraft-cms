import axios from 'axios';
import fs from 'fs';
import path from 'path';

// Read the content from initial-landing-page.json
const content = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/initial-landing-page.json'), 'utf8'));

// Save the content through the API
export async function updateContent() {
  try {
    const response = await axios.post('/api/save-content', { content });
    if (response.data.success) {
      console.log('Content updated successfully');
      return { success: true };
    } else {
      throw new Error(response.data.error || 'Failed to save content');
    }
  } catch (error) {
    console.error('Error saving content:', error);
    return { success: false, error: 'Failed to save content' };
  }
}

// Run the update
updateContent();