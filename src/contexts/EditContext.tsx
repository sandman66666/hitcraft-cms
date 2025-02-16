import React, { createContext, useState, useContext, useEffect } from 'react';
import { ContentLoader } from '../utils/content-loader';

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
  const [showEditButton, setShowEditButton] = useState(false);
  const [keySequence, setKeySequence] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const contentLoader = ContentLoader.getInstance();
        const initialContent = await contentLoader.getContent();
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
    }
    setIsEditMode(!isEditMode);
  };

  const saveContent = async () => {
    if (!content) {
      console.error('No content to save');
      return;
    }

    try {
      const response = await fetch('/api/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error('Failed to save content');
      }

      // Clear the content loader cache to ensure fresh content on next load
      ContentLoader.getInstance().clearCache();
      
      alert('Content saved successfully');
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to save content');
    }
  };

  return (
    <EditContext.Provider value={{ 
      isEditMode, 
      toggleEditMode, 
      content, 
      setContent, 
      saveContent, 
      showEditButton 
    }}>
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