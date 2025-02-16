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

export async function getBackups() {
  try {
    const response = await axios.get('/api/get-backups');
    return response.data;
  } catch (error) {
    console.error('Error getting backups:', error);
    throw new Error('Error getting backups');
  }
}

export async function restoreBackup(backupId: string) {
  try {
    const response = await axios.post(`/api/restore-backup/${backupId}`);
    return response.data;
  } catch (error) {
    console.error('Error restoring backup:', error);
    throw new Error('Error restoring backup');
  }
}