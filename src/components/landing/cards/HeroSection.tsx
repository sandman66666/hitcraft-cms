import React from 'react';
import { HeroContent } from "../../../types/landing";
import { CTAButton } from "@/components/shared/CTAButton";
import { ContentLoader } from "@/utils/content-loader";
import EditableText from '../../shared/EditableText';
import { useEdit } from '../../../contexts/EditContext';

interface HeroSectionProps {
  content?: HeroContent;
}

export default function HeroSection({ content: propContent }: HeroSectionProps) {
  const { isEditMode, content, setContent } = useEdit();
  const [localContent, setLocalContent] = React.useState<HeroContent | null>(null);

  React.useEffect(() => {
    if (propContent) {
      setLocalContent(propContent);
    } else {
      ContentLoader.getInstance().getContent()
        .then(content => {
          if (content?.hero) {
            setLocalContent(content.hero);
          }
        })
        .catch(error => console.error('Error loading hero content:', error));
    }
  }, [propContent]);

  if (!localContent) {
    return null; // or loading state
  }

  const titleWords = localContent.subtitle.split(' ');

  const updateContent = (path: string, value: string) => {
    if (!content) return;
    const newContent = { ...content };
    const pathArray = path.split('.');
    let current: any = newContent;
    
    for (let i = 0; i < pathArray.length - 1; i++) {
      current = current[pathArray[i]];
    }
    current[pathArray[pathArray.length - 1]] = value;
    setContent(newContent);
  };

  return (
    <section className="w-full h-[100vh] h-[100svh] min-h-[600px] flex items-center justify-center relative bg-gradient-to-br from-purple-50 to-white overflow-hidden" aria-label="Hero">
      <div className="absolute inset-0 bg-[url('/assets/images/bg/2xl_bg.png')] bg-cover bg-center opacity-5" />
      <div className="text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <EditableText
          content={localContent.title}
          onChange={(value) => updateContent('hero.title', value)}
          className="text-xl sm:text-2xl italic text-gray-900 mb-12 animate-fade-in font-poppins"
        />
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[6rem] font-extralight mb-12 font-poppins bg-gradient-to-r from-[#A533FF] to-[#ff3366] text-transparent bg-clip-text leading-[1.15] max-w-4xl mx-auto">
          <EditableText
            content={localContent.subtitle}
            onChange={(value) => updateContent('hero.subtitle', value)}
            className="inline"
          />
        </h1>
        <EditableText
          content={localContent.description}
          onChange={(value) => updateContent('hero.description', value)}
          className="text-[1.35rem] sm:text-[1.45rem] mb-12 text-gray-800 max-w-3xl mx-auto font-light leading-relaxed tracking-[0.02em]"
        />
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
          <CTAButton 
            text={content?.hero?.button?.text || localContent.button.text}
            variant="light"
          />
        </div>
      </div>
    </section>
  );
}