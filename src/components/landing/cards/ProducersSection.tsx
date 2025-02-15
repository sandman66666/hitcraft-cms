import React from 'react';
import { ProduceSongContent } from "../../../types/content";
import { ContentLoader } from "@/utils/content-loader";
import EditableText from '../../shared/EditableText';
import { useEdit } from '../../../contexts/EditContext';
import { CTAButton } from "@/components/shared/CTAButton";

interface ProducersSectionProps {
  content?: ProduceSongContent;
}

export default function ProducersSection({ content: initialContent = ContentLoader.getInstance().getContent().produceSong }: ProducersSectionProps) {
  const { isEditMode, content, setContent } = useEdit();
  const subtitleParts = initialContent.subtitle.split(' ');

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
    <section className="w-full min-h-[100vh] min-h-[100svh] py-16 sm:py-24 relative bg-gradient-to-br from-purple-900 to-red-900 overflow-hidden scroll-snap-align-start">
      <div className="absolute inset-0 bg-[url('/assets/images/bg/2xl_bg.png')] bg-cover bg-center opacity-5" />
      <div className="absolute right-0 bottom-0 w-3/4 h-3/4 bg-[url('/assets/images/landing/layer-1@3x.webp')] bg-no-repeat bg-right-bottom bg-contain opacity-10" />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-2 mb-[-5]">
            <EditableText
              content={initialContent.title}
              onChange={(value) => updateContent('produceSong.title', value)}
              className="text-2xl sm:text-3xl lg:text-[30px] font-extralight mb-6 font-poppins text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.2)]"
              as="h2"
            />
            <h3 className="text-4xl sm:text-5xl lg:text-[72px] font-extralight leading-tight font-poppins text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.2)]">
              <EditableText
                content={initialContent.subtitle}
                onChange={(value) => updateContent('produceSong.subtitle', value)}
                className="inline"
              />
            </h3>
          </div>
          <div className="text-white lg:col-span-2 xl:col-span-1">
            <EditableText
              content={initialContent.description}
              onChange={(value) => updateContent('produceSong.description', value)}
              className="text-lg sm:text-xl lg:text-2xl mb-12 text-gray-200 max-w-5xl leading-relaxed"
            />
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 sm:p-10 mb-12 max-w-2xl shadow-[0px_4px_24px_rgba(0,0,0,0.1)]">
              <ul className="text-left text-base sm:text-lg lg:text-xl text-gray-200 space-y-6 sm:space-y-8">
                {initialContent.features?.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-white mr-4 text-2xl">•</span>
                    <EditableText
                      content={feature}
                      onChange={(value) => {
                        const newFeatures = [...(initialContent.features || [])];
                        newFeatures[index] = value;
                        updateContent('produceSong.features', newFeatures);
                      }}
                      className="inline"
                    />
                  </li>
                ))}
              </ul>
            </div>
            {initialContent.additionalDescription && (
              <EditableText
                content={initialContent.additionalDescription}
                onChange={(value) => updateContent('produceSong.additionalDescription', value)}
                className="text-lg sm:text-xl lg:text-2xl mb-12 text-gray-200 max-w-3xl leading-relaxed"
              />
            )}
            <CTAButton
              text={initialContent.button.text}
              variant="light"
            />
          </div>
        </div>
      </div>
    </section>
  );
}