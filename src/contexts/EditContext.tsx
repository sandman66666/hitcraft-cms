import React, { createContext, useState, useContext, useEffect } from 'react';
import { getContent } from '../api/get-content';
import { saveContent as apiSaveContent } from '../api/save-content';
import { createBackup } from '../api/createBackup';

interface EditContextType {
  isEditMode: boolean;
  toggleEditMode: () => Promise<void>;
  content: any;
  setContent: React.Dispatch<React.SetStateAction<any>>;
  saveContent: () => Promise<void>;
}

const EditContext = createContext<EditContextType | undefined>(undefined);

export const EditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState<any>(null);
  const [latestBackup, setLatestBackup] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const initialContent = await getContent();
        setContent(initialContent);
      } catch (error) {
        console.error('Error fetching initial content:', error);
      }
    };
    fetchContent();
  }, []);

  const toggleEditMode = async () => {
    if (!isEditMode && content) {
      try {
        // Create a backup when entering edit mode
        const backupResult = await createBackup(content);
        setLatestBackup(backupResult.backupFile);
      } catch (error) {
        console.error('Error creating backup:', error);
        // You might want to show an error message to the user here
      }
    }
    setIsEditMode(!isEditMode);
  };

  const saveContent = async () => {
    if (!content) {
      console.error('No content to save');
      return;
    }

    try {
      await apiSaveContent('landing-page.json', content);
      console.log('Content saved successfully');
    } catch (error) {
      console.error('Error saving content:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <EditContext.Provider value={{ isEditMode, toggleEditMode, content, setContent, saveContent }}>
      {children}
    </EditContext.Provider>
  );
};

export function useEdit() {
  const context = useContext(EditContext);
  if (context === undefined) {
    throw new Error('useEdit must be used within an EditProvider');
  }
  return context;
}