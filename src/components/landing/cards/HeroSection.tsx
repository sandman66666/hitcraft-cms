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
      className="w-full h-[100vh] h-[100svh] min-h-[600px] flex items-center relative bg-gradient-to-br from-gray-900 to-black overflow-hidden"
      aria-label="Hero"
    >
      <div className="absolute inset-0 bg-[url('/assets/images/bg/2xl_bg.png')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden select-none">
        <div className="shooting-star">
          <div className="star"></div>
          <div className="star-trail"></div>
        </div>
      </div>
      <div className="text-center max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-extralight mb-12 leading-[1.1]">
          <EditableText
            content={initialContent?.title || 'Turn Your Ideas'}
            onChange={(value) => updateContent('hero.title', value)}
            className="bg-clip-text text-transparent bg-gradient-to-r from-[#8a44c8] to-[#df0c39] animate-fade-in block tracking-tight"
          />
          <EditableText
            content={initialContent?.subtitle || 'Into Finished Songs'}
            onChange={(value) => updateContent('hero.subtitle', value)}
            className="font-bold block mt-6 bg-clip-text text-transparent bg-gradient-to-r from-[#8a44c8] to-[#df0c39] tracking-tight"
          />
        </h1>
        <EditableText
          content={initialContent?.description || "Whether you're stuck on lyrics, need help composing melodies, or want to bring your song to life—HitCraft helps you write songs, effortlessly"}
          onChange={(value: string) => updateContent('hero.description', value)}
          className="text-base sm:text-xl lg:text-2xl font-light mb-16 text-white/80 max-w-4xl mx-auto animate-fade-in-delay leading-relaxed tracking-wide"
        />
        <div className="inline-flex flex-col items-center animate-fade-in-delay-2">
          <CTAButton 
            className="text-base sm:text-xl bg-gradient-to-r from-[#8a44c8] to-[#df0c39] text-white px-10 py-5 rounded-full font-black transition-all duration-300 hover:scale-105 hover:shadow-[0px_4px_12px_rgba(138,68,200,0.3)] hover:-translate-y-0.5 flex items-center justify-center w-full sm:w-auto min-w-[280px]"
            text={initialContent?.button?.text || 'START CREATING NOW'}
            variant="light"
          />
          <p className="text-sm text-gray-400 mt-6 font-light tracking-wide">{initialContent?.secondaryText || 'No credit card required • Try it free'}</p>
        </div>
      </div>
    </section>
  );
}