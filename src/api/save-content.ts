import { writeFile, mkdir } from 'fs/promises';
import { dirname } from 'path';

export async function saveContent(path: string, content: any) {
  try {
    // Create directories if they don't exist
    await mkdir(dirname(path), { recursive: true });
    
    // Write the content to file
    await writeFile(path, JSON.stringify(content, null, 2), 'utf8');
    
    return { success: true };
  } catch (error) {
    console.error('Error saving content:', error);
    return { success: false, error: 'Failed to save content' };
  }
}
