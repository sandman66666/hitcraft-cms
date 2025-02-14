import { NextApiRequest, NextApiResponse } from 'next';
import { saveContent } from '../../api/save-content';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { content, path } = req.body;
    
    if (!content || !path) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const result = await saveContent(path, content);
    
    if (!result.success) {
      return res.status(500).json({ message: result.error });
    }

    res.status(200).json({ message: 'Content saved successfully' });
  } catch (error) {
    console.error('Error in save-content API:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
