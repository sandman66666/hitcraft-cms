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
  showEditButton: boolean;
}

const EditContext = createContext<EditContextType | undefined>(undefined);

export const EditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState<any>(null);
  const [latestBackup, setLatestBackup] = useState<string | null>(null);
  const [showEditButton, setShowEditButton] = useState(false);
  const [keySequence, setKeySequence] = useState('');

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

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      setKeySequence(prev => {
        const newSequence = (prev + event.key).slice(-3);
        if (newSequence === 'sss' && !showEditButton) {
          setShowEditButton(true);
        }
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showEditButton]);

  const toggleEditMode = async () => {
    if (!isEditMode) {
      const username = prompt('Username:');
      const password = prompt('Password:');
      
      if (username !== 'Admin' || password !== 'S42=HitCraft') {
        alert('Invalid credentials');
        return;
      }

      if (content) {
        try {
          const backupResult = await createBackup(content);
          setLatestBackup(backupResult.backupFile);
        } catch (error) {
          console.error('Error creating backup:', error);
        }
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
    }
  };

  return (
    <EditContext.Provider value={{ isEditMode, toggleEditMode, content, setContent, saveContent, showEditButton }}>
      {children}
    </EditContext.Provider>
  );
};

export const useEdit = () => {
  const context = useContext(EditContext);
  if (context === undefined) {
    throw new Error('useEdit must be used within an EditProvider');
  }
  return context;
};