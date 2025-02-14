import React from 'react';
import { CTAButton } from '@/components/shared/CTAButton';
import { CallToActionContent } from '../../../types/content';
import EditableText from '../../shared/EditableText';
import { useEdit } from '../../../contexts/EditContext';

interface CallToActionSectionProps {
  content: CallToActionContent;
}

export default function CallToActionSection({ content: initialContent }: CallToActionSectionProps) {
  const { isEditMode, content, setContent } = useEdit();

  const updateContent = (path: string, value: any) => {
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
    <section className="w-full bg-gradient-to-br from-pink-50 to-white pt-12 pb-3 sm:pt-16 sm:pb-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/images/bg/2xl_bg.png')] bg-cover bg-center opacity-5" />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <EditableText
            as="h2"
            content="CALL TO ACTION:"
            onChange={(value) => updateContent('callToAction.preTitle', value)}
            className="text-[24px] font-extralight mb-4 text-gray-800 font-poppins"
          />
          <EditableText
            as="h3"
            content={initialContent.title}
            onChange={(value) => updateContent('callToAction.title', value)}
            className="text-4xl sm:text-5xl lg:text-6xl font-extralight mb-8 text-gray-900 font-poppins leading-tight"
          />
          <EditableText
            content={initialContent.subtitle}
            onChange={(value) => updateContent('callToAction.subtitle', value)}
            className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-10"
          />
          {isEditMode ? (
            <input
              type="text"
              value={initialContent.button.text}
              onChange={(e) => updateContent('callToAction.button.text', e.target.value)}
              className="px-4 py-2 border border-blue-300 rounded-md"
            />
          ) : (
            <CTAButton text={initialContent.button.text} />
          )}
          <div className="mt-6 text-gray-600 text-sm sm:text-base">
            {initialContent.features.map((feature, index) => (
              <EditableText
                key={index}
                content={feature}
                onChange={(value) => {
                  const newFeatures = [...initialContent.features];
                  newFeatures[index] = value;
                  updateContent('callToAction.features', newFeatures);
                }}
                className="inline-block"
              />
            )).reduce((prev, curr) => (
              <>{prev} • {curr}</>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}