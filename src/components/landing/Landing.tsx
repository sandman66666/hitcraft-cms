import React, { useEffect, useState } from 'react';
import { ContentLoader } from '../../utils/content-loader';
import { LandingPageContent } from '../../types/content';
import HeroSection from './cards/HeroSection';
import MainValueSection from './cards/MainValueSection';
import CoreBenefitsSection from './cards/CoreBenefitsSection';
import SongwritersSection from './cards/SongwritersSection';
import UniqueApproachSection from './cards/UniqueApproachSection';
import SocialProofSection from './cards/SocialProofSection';
import CallToActionSection from './cards/CallToActionSection';

const Landing: React.FC = () => {
  const [content, setContent] = useState<LandingPageContent | null>(null);
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
    <div className="landing flex flex-col">
      <HeroSection content={content.hero} />
      <MainValueSection content={content.mainValue} />
      <CoreBenefitsSection content={content.coreBenefits} />
      <SongwritersSection content={content.demo} />
      <UniqueApproachSection content={content.uniqueApproach} />
      <SocialProofSection content={content.socialProof} />
      <CallToActionSection content={content.callToAction} />
    </div>
  );
};

export default Landing;