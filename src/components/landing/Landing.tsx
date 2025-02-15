import React, { useEffect, useState } from 'react';
import { ContentLoader } from '../../utils/content-loader';
import { LandingPageContent } from '../../types/content';
import HeroSection from './cards/HeroSection';
import MainValueSection from './cards/MainValueSection';
import CoreBenefitsSection from './cards/CoreBenefitsSection';
import ProducersSection from './cards/ProducersSection';
import SongwritersSection from './cards/SongwritersSection';
import UniqueApproachSection from './cards/UniqueApproachSection';
import SocialProofSection from './cards/SocialProofSection';
import CallToActionSection from './cards/CallToActionSection';
import { EditProvider, useEdit } from '../../contexts/EditContext';

function EditModeToggle() {
  const { isEditMode, toggleEditMode, saveContent, showEditButton } = useEdit();

  if (!showEditButton) return null;

  return (
    <div className="fixed bottom-4 right-4 flex gap-2">
      <button
        onClick={toggleEditMode}
        className={`px-4 py-2 rounded-md shadow-sm ${
          isEditMode 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {isEditMode ? 'Exit Edit Mode' : 'Edit Content'}
      </button>
      {isEditMode && (
        <button
          onClick={async () => {
            try {
              await saveContent();
              alert('Changes saved successfully!');
            } catch (error) {
              alert('Failed to save changes');
            }
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700"
        >
          Save Changes
        </button>
      )}
    </div>
  );
}

function LandingContent() {
  const { content, setContent } = useEdit();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContent = async () => {
    try {
      const contentLoader = ContentLoader.getInstance();
      const landingContent = await contentLoader.getContent();
      setContent(landingContent);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load content');
      setLoading(false);
    }
  };

  useEffect(() => {
    // Clear the content cache before loading
    const contentLoader = ContentLoader.getInstance();
    contentLoader.clearCache();
    loadContent();

    // Listen for content updates
    const handleContentUpdate = () => {
      loadContent();
    };
    window.addEventListener('contentUpdated', handleContentUpdate);

    return () => {
      window.removeEventListener('contentUpdated', handleContentUpdate);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Error: {error || 'Failed to load content'}</div>
      </div>
    );
  }

  return (
    <main className="w-full">
      <HeroSection content={content.hero} />
      <MainValueSection content={content.mainValue} />
      <CoreBenefitsSection content={content.coreBenefits} />
      <ProducersSection content={content.produceSong} />
      <SongwritersSection content={content.writingPartner} />
      <UniqueApproachSection content={content.uniqueApproach} />
      <SocialProofSection content={content.socialProof} />
      <CallToActionSection content={content.callToAction} />
      <EditModeToggle />
    </main>
  );
}

export default function Landing() {
  return (
    <EditProvider>
      <LandingContent />
    </EditProvider>
  );
}