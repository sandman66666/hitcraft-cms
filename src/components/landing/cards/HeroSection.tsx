import { HeroContent } from "../../../types/content";
import { CTAButton } from "@/components/shared/CTAButton";
import { ContentLoader } from "@/utils/content-loader";
import EditableText from '../../shared/EditableText';
import { useEdit } from '../../../contexts/EditContext';
import { useState, useEffect } from 'react';
import '@/styles/components/shooting-star.css';

interface HeroSectionProps {
  content?: HeroContent;
}

export default function HeroSection({ content: initialContent }: HeroSectionProps) {
  const { isEditMode, content: editContent, setContent } = useEdit();

  const updateContent = (path: string, value: string) => {
    if (!editContent) return;
    const newContent = { ...editContent };
    const pathArray = path.split('.');
    let current: any = newContent;
    
    for (let i = 0; i < pathArray.length - 1; i++) {
      current = current[pathArray[i]];
    }
    current[pathArray[pathArray.length - 1]] = value;
    setContent(newContent);
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center relative bg-[#fcf9fe] pt-20" 
      aria-label="Hero"
    >
      <div className="absolute inset-0 bg-[url('/assets/images/bg/2xl_bg.png')] bg-cover bg-center opacity-5" />
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden select-none">
        <div className="shooting-star">
          <div className="star"></div>
          <div className="star-trail"></div>
        </div>
      </div>
      <div className="text-center max-w-5xl mx-auto px-4 sm:px-8 py-24 md:py-40 relative z-10">
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-light mb-16 leading-[1.3]">
          <EditableText
            content={initialContent?.title || 'Turn Your Ideas'}
            onChange={(value) => updateContent('hero.title', value)}
            className="bg-clip-text text-transparent bg-gradient-to-r from-[#8a44c8] to-[#df0c39] animate-fade-in"
          />
          <EditableText
            content={initialContent?.subtitle || 'Into Finished Songs'}
            onChange={(value) => updateContent('hero.subtitle', value)}
            className="font-bold block mt-6 mb-6 pb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#8a44c8] to-[#df0c39]"
          />
        </h1>
        <EditableText
          content={initialContent?.description || "Whether you're stuck on lyrics, need help composing melodies, or want to bring your song to life—HitCraft helps you write songs, effortlessly"}
          onChange={(value: string) => updateContent('hero.description', value)}
          className="text-xl sm:text-2xl lg:text-3xl font-light mb-16 text-gray-600 max-w-3xl mx-auto animate-fade-in-delay"
        />
        <div className="inline-flex flex-col items-center animate-fade-in-delay-2">
          <CTAButton 
            className="text-xl bg-gradient-to-r from-[#8a44c8] to-[#df0c39] text-white px-8 py-4 rounded-full font-black transition-all duration-300 hover:scale-105 hover:shadow-[0px_4px_12px_rgba(138,68,200,0.3)] hover:-translate-y-0.5 flex items-center justify-center w-full sm:w-auto min-w-[200px]"
            text={initialContent?.button?.text || 'START CREATING NOW'}
            variant="light"
          />
          <p className="text-sm text-gray-600 mt-4 font-light">{initialContent?.secondaryText || 'No credit card required • Try it free'}</p>
        </div>
      </div>
    </section>
  );
}