import { LandingPageContent } from '../types/content';
import defaultContent from '../data/landing-page.json';

export class ContentLoader {
  private static instance: ContentLoader;
  private content: LandingPageContent = defaultContent as LandingPageContent;

  private constructor() {
    // Load from localStorage if available
    const savedContent = localStorage.getItem('landing-page-content');
    if (savedContent) {
      try {
        this.content = JSON.parse(savedContent);
      } catch (error) {
        console.error('Error parsing saved content:', error);
      }
    }
  }

  public static getInstance(): ContentLoader {
    if (!ContentLoader.instance) {
      ContentLoader.instance = new ContentLoader();
    }
    return ContentLoader.instance;
  }

  // Synchronous content access - always returns content immediately
  public getContent(): LandingPageContent {
    return this.content;
  }

  // Asynchronous content refresh - fetches latest from server
  public async refreshContent(): Promise<LandingPageContent> {
    try {
      const response = await fetch('/src/data/landing-page.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch content: ${response.statusText}`);
      }
      this.content = await response.json();
      // Save to localStorage for future use
      localStorage.setItem('landing-page-content', JSON.stringify(this.content));
      // Notify components that content has changed
      window.dispatchEvent(new CustomEvent('contentUpdated'));
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
    this.content = defaultContent as LandingPageContent;
    window.dispatchEvent(new CustomEvent('contentUpdated'));
  }
}
