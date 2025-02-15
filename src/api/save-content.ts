import axios from 'axios';

export async function saveContent(filePath: string, content: any) {
  try {
    const response = await axios.post('/api/save-content', { filePath, content });
    
    if (response.status === 200) {
      return { success: true };
    } else {
      throw new Error(response.data.message || 'Failed to save content');
    }
  } catch (error) {
    console.error('Error saving content:', error);
    return { success: false, error: 'Failed to save content' };
  }
}