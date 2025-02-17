import React from 'react';
import CTAButton from '../../shared/CTAButton';
import { CallToActionContent } from '../../../types/landing';
import EditableText from '../../shared/EditableText';
import { useEdit } from '../../../contexts/EditContext';
import { ContentLoader } from '@/utils/content-loader';

interface CallToActionSectionProps {
  content?: CallToActionContent;
}

export default function CallToActionSection({ content: propContent }: CallToActionSectionProps) {
  const { isEditMode, content, setContent } = useEdit();
  const [localContent, setLocalContent] = React.useState<CallToActionContent | null>(null);

  React.useEffect(() => {
    if (propContent) {
      setLocalContent(propContent);
    } else {
      ContentLoader.getInstance().getContent()
        .then(content => {
          if (content?.callToAction) {
            setLocalContent(content.callToAction);
          }
        })
        .catch(error => console.error('Error loading call to action content:', error));
    }
  }, [propContent]);

  if (!localContent) {
    return null; // or loading state
  }

  const updateContent = (path: string, value: string | string[]) => {
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
    <section className="w-full h-[100vh] h-[100svh] py-16 sm:py-24 relative bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/images/bg/2xl_bg.png')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden select-none">
        <div className="shooting-star">
          <div className="star"></div>
          <div className="star-trail"></div>
        </div>
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <EditableText
            as="h3"
            content={localContent.title || ''}
            onChange={(value) => updateContent('callToAction.title', value)}
            className="text-4xl sm:text-5xl lg:text-6xl font-extralight mb-8 font-poppins leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#8a44c8] to-[#df0c39] [text-shadow:1px_1px_4px_rgba(0,0,0,0.2)]"
          />
          <EditableText
            content={localContent.subtitle || ''}
            onChange={(value) => updateContent('callToAction.subtitle', value)}
            className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-10"
          />
          <div className="flex justify-center">
            <CTAButton 
              text={localContent.button?.text || ''}
              variant="dark" 
            />
          </div>
          {(localContent.features || []).length > 0 && (
            <div className="mt-6 text-gray-300 text-sm sm:text-base">
              {(localContent.features || []).map((feature: string, index: number) => (
                <EditableText
                  key={index}
                  content={feature}
                  onChange={(value) => {
                    const newFeatures = [...(localContent.features || [])];
                    newFeatures[index] = value;
                    updateContent('callToAction.features', newFeatures);
                  }}
                  className="inline-block"
                />
              )).reduce((prev: React.ReactNode, curr: React.ReactNode) => (
                <>{prev} • {curr}</>
              ), <></>)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}