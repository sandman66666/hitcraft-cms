import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LandingPageContent } from '../types/content';

interface EditContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  content: LandingPageContent | null;
  setContent: (content: LandingPageContent) => void;
  saveContent: () => Promise<void>;
}

const EditContext = createContext<EditContextType | undefined>(undefined);

export function EditProvider({ children }: { children: ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState<LandingPageContent | null>(null);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const saveContent = async () => {
    if (!content) return;

    try {
      // Create backup with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupPath = `/src/data/backups/landing-page-${timestamp}.json`;
      
      await fetch('/api/save-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, path: backupPath })
      });

      // Save new content
      await fetch('/api/save-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, path: '/src/data/landing-page.json' })
      });
    } catch (error) {
      console.error('Failed to save content:', error);
      throw error;
    }
  };

  return (
    <EditContext.Provider value={{ isEditMode, toggleEditMode, content, setContent, saveContent }}>
      {children}
    </EditContext.Provider>
  );
}

export function useEdit() {
  const context = useContext(EditContext);
  if (context === undefined) {
    throw new Error('useEdit must be used within an EditProvider');
  }
  return context;
}
