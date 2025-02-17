import React from 'react';
import { ProduceSongContent } from "../../../types/landing";
import { ContentLoader } from "@/utils/content-loader";
import EditableText from '../../shared/EditableText';
import { useEdit } from '../../../contexts/EditContext';
import { CTAButton } from "@/components/shared/CTAButton";

interface ProducersSectionProps {
  content?: ProduceSongContent;
}

export default function ProducersSection({ content: propContent }: ProducersSectionProps) {
  const { isEditMode, content, setContent } = useEdit();
  const [localContent, setLocalContent] = React.useState<ProduceSongContent | null>(null);

  React.useEffect(() => {
    if (propContent) {
      setLocalContent(propContent);
    } else {
      ContentLoader.getInstance().getContent()
        .then(content => {
          if (content?.produceSong) {
            setLocalContent(content.produceSong);
          }
        })
        .catch(error => console.error('Error loading producer content:', error));
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-2 mb-[-5]">
            <EditableText
              content={localContent.title || ''}
              onChange={(value) => updateContent('produceSong.title', value)}
              className="text-2xl sm:text-3xl lg:text-[30px] font-extralight mb-6 font-poppins bg-clip-text text-transparent bg-gradient-to-r from-[#8a44c8] to-[#df0c39] [text-shadow:1px_1px_4px_rgba(0,0,0,0.2)]"
              as="h2"
            />
            <h3 className="text-4xl sm:text-5xl lg:text-[72px] font-extralight leading-tight font-poppins bg-clip-text text-transparent bg-gradient-to-r from-[#8a44c8] to-[#df0c39] [text-shadow:1px_1px_4px_rgba(0,0,0,0.2)]">
              <EditableText
                content={localContent.subtitle || ''}
                onChange={(value) => updateContent('produceSong.subtitle', value)}
                className="inline"
              />
            </h3>
          </div>
          <div className="text-white lg:col-span-2 xl:col-span-1">
            <EditableText
              content={localContent.description || ''}
              onChange={(value) => updateContent('produceSong.description', value)}
              className="text-lg sm:text-xl lg:text-2xl mb-12 text-gray-200 max-w-5xl leading-relaxed"
            />
            <div className="bg-white/[0.12] backdrop-blur-sm rounded-2xl p-8 sm:p-10 mb-12 max-w-2xl shadow-[0px_4px_24px_rgba(0,0,0,0.1)] border border-white/10">
              <ul className="text-left text-base sm:text-lg lg:text-xl text-gray-200 space-y-6 sm:space-y-8">
                {localContent.features?.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <span className="text-white mr-4 text-2xl">•</span>
                    <EditableText
                      content={feature}
                      onChange={(value) => {
                        const newFeatures = [...(localContent.features || [])];
                        newFeatures[index] = value;
                        updateContent('produceSong.features', newFeatures);
                      }}
                      className="inline"
                    />
                  </li>
                ))}
              </ul>
            </div>
            <CTAButton
              text={localContent.button?.text || ''}
              variant="light"
            />
          </div>
        </div>
      </div>
    </section>
  );
}