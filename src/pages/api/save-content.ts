import fs from 'fs/promises';
import path from 'path';
import { createBackup } from '../../api/createBackup';

interface RequestBody {
  content: any;
  path: string;
}

interface Request {
  method: string;
  body: RequestBody;
}

interface Response {
  status: (code: number) => Response;
  json: (data: any) => void;
}

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { content, path: filePath } = req.body;
    
    if (!content || !filePath) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Ensure the file path is within the project directory
    const fullPath = path.join(process.cwd(), filePath);
    if (!fullPath.startsWith(process.cwd())) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Create a backup of the current content
    await createBackup(content);

    // Create directories if they don't exist
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    
    // Write the new content to file
    await fs.writeFile(fullPath, JSON.stringify(content, null, 2), 'utf8');
    
    res.status(200).json({ message: 'Content saved successfully with backup' });
  } catch (error) {
    console.error('Error in save-content API:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}