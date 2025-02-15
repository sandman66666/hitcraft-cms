import { LandingPageContent } from '../types/content';

export class ContentService {
  private static instance: ContentService;
  private baseUrl: string;

  private constructor() {
    // Use a direct URL for now
    this.baseUrl = 'http://localhost:5174/api';
  }

  public static getInstance(): ContentService {
    if (!ContentService.instance) {
      ContentService.instance = new ContentService();
    }
    return ContentService.instance;
  }

  async getContent(): Promise<LandingPageContent> {
    try {
      const response = await fetch(`${this.baseUrl}/content`);
      if (!response.ok) {
        throw new Error('Failed to fetch content');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching content:', error);
      throw error;
    }
  }

  async createBackup(content: LandingPageContent): Promise<void> {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const response = await fetch(`${this.baseUrl}/content/backup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          filename: `landing-page-backup-${timestamp}.json`
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create backup');
      }
    } catch (error) {
      console.error('Error creating backup:', error);
      throw error;
    }
  }

  async updateContent(content: LandingPageContent): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/content`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        throw new Error('Failed to update content');
      }
    } catch (error) {
      console.error('Error updating content:', error);
      throw error;
    }
  }
}
