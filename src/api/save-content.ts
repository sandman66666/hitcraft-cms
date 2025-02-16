import axios from 'axios';

export async function saveContent(content: any) {
  try {
    const response = await axios.post('/api/save-content', { content });
    if (response.data.success) {
      return { success: true };
    } else {
      throw new Error(response.data.error || 'Failed to save content');
    }
  } catch (error) {
    console.error('Error saving content:', error);
    return { success: false, error: 'Failed to save content' };
  }
}