import { LandingPageContent } from '../types/content';

export class ContentService {
  private static instance: ContentService;
  private baseUrl: string;

  private constructor() {
    // In production, this would be your AWS API Gateway endpoint
    this.baseUrl = process.env.VITE_API_URL || 'http://localhost:3000/api';
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
