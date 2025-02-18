import { LandingPageContent } from '../types/content';

export class ContentLoader {
  private static instance: ContentLoader;
  private content: any = null;
  private lastFetchTime: number = 0;
  private cacheDuration: number = 5 * 60 * 1000; // 5 minutes

  public static getInstance(): ContentLoader {
    if (!ContentLoader.instance) {
      ContentLoader.instance = new ContentLoader();
    }
    return ContentLoader.instance;
  }

  public async getContent() {
    const now = Date.now();
    if (!this.content || now - this.lastFetchTime > this.cacheDuration) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/get-content`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }
        const data = await response.json();
        this.content = data?.content || null;
        this.lastFetchTime = now;
      } catch (error) {
        console.error('Error fetching content:', error);
        throw error;
      }
    }
    return this.content;
  }

  public clearCache() {
    this.content = null;
    this.lastFetchTime = 0;
  }
}