import { LandingPageContent } from '../types/content';

export class ContentLoader {
  private static instance: ContentLoader;
  private content: LandingPageContent | null = null;

  private constructor() {}

  public static getInstance(): ContentLoader {
    if (!ContentLoader.instance) {
      ContentLoader.instance = new ContentLoader();
    }
    return ContentLoader.instance;
  }

  public async getContent(): Promise<LandingPageContent> {
    try {
      // Always load from JSON file first
      const response = await fetch('/src/data/landing-page.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch content: ${response.statusText}`);
      }
      this.content = await response.json();
      // Save to localStorage for future use
      localStorage.setItem('landing-page-content', JSON.stringify(this.content));
    } catch (error) {
      console.error('Error loading content:', error);
      throw error;
    }
    return this.content;
  }

  public async updateContent(newContent: LandingPageContent): Promise<void> {
    try {
      // Save to localStorage
      this.content = newContent;
      localStorage.setItem('landing-page-content', JSON.stringify(newContent));
      
      // Notify components that content has changed
      window.dispatchEvent(new CustomEvent('contentUpdated'));
    } catch (error) {
      console.error('Error saving content:', error);
      throw error;
    }
  }

  public clearCache(): void {
    localStorage.removeItem('landing-page-content');
    this.content = null;
  }
}
