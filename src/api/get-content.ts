import axios from 'axios';

export async function getContent() {
  try {
    const response = await axios.get('/api/get-content');
    return response.data;
  } catch (error) {
    console.error('Error reading content:', error);
    throw new Error('Error reading content');
  }
}

export default getContent;