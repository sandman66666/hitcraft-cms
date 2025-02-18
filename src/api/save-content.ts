import axios from 'axios';
import { LandingPageContent } from '../types/landing';

// Save the content through the API
export async function updateContent(content: LandingPageContent) {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/save-content`, { content });
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