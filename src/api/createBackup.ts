import axios from 'axios';

export async function createBackup(content: any) {
  try {
    const response = await axios.post('/api/create-backup', { content });
    return response.data;
  } catch (error) {
    console.error('Error creating backup:', error);
    throw new Error('Error creating backup');
  }
}

export default createBackup;