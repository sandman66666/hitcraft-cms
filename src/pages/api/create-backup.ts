import fs from 'fs/promises';
import path from 'path';

export async function post({ request }: { request: Request }) {
  console.log('Received request to create-backup endpoint');

  try {
    const { content } = await request.json();
    
    if (!content) {
      console.error('Missing required fields');
      return new Response(JSON.stringify({ message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('Content received:', JSON.stringify(content).slice(0, 100) + '...');

    const backupDir = path.join(process.cwd(), 'src', 'data', 'backups');
    console.log('Backup directory:', backupDir);

    try {
      await fs.access(backupDir);
      console.log('Backup directory exists');
    } catch (error) {
      console.log('Backup directory does not exist, creating it...');
      try {
        await fs.mkdir(backupDir, { recursive: true });
        console.log('Backup directory created successfully');
      } catch (mkdirError) {
        console.error('Error creating backup directory:', mkdirError);
        throw mkdirError;
      }
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFileName = `landing-page-backup-${timestamp}.json`;
    const backupPath = path.join(backupDir, backupFileName);
    console.log('Backup file path:', backupPath);

    try {
      await fs.writeFile(backupPath, JSON.stringify(content, null, 2), 'utf8');
      console.log('Backup file written successfully');
    } catch (writeError) {
      console.error('Error writing backup file:', writeError);
      throw writeError;
    }
    
    console.log(`Backup created successfully: ${backupFileName}`);
    return new Response(JSON.stringify({ message: 'Backup created successfully', backupFile: backupFileName }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error in create-backup API:', error);
    let errorMessage = 'Internal server error';
    if (error instanceof Error) {
      errorMessage = `${error.name}: ${error.message}`;
      console.error('Error stack:', error.stack);
    }
    return new Response(JSON.stringify({ message: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}