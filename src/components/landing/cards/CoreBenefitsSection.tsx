import React from 'react';
import { CoreBenefitsContent } from "../../../types/content";
import EditableText from '../../shared/EditableText';
import CTAButton from '../../shared/CTAButton';
import { useEdit } from '../../../contexts/EditContext';

interface CoreBenefitsSectionProps {
  content: CoreBenefitsContent;
}

const iconMap: { [key: string]: JSX.Element } = {
  chat: (
    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  lightbulb: (
    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  star: (
    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  )
};

export default function CoreBenefitsSection({ content: initialContent }: CoreBenefitsSectionProps) {
  const { isEditMode, content, setContent } = useEdit();

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
    <section className="w-full min-h-[100vh] min-h-[100svh] py-16 sm:py-24 pb-[74px] relative bg-gradient-to-br from-purple-50 to-white overflow-hidden scroll-snap-align-start">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 sm:mb-20">
          <EditableText
            content={initialContent.title}
            onChange={(value) => updateContent('coreBenefits.title', value)}
            className="text-4xl sm:text-5xl lg:text-[72px] font-extralight mb-12 text-gray-900 font-poppins [text-shadow:1px_1px_4px_rgba(0,0,0,0.1)]"
            as="h2"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {initialContent.benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="text-center p-6 sm:p-8 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-gradient-to-r from-[#8a44c8] to-[#df0c39] rounded-full flex items-center justify-center shadow-md">
                {iconMap[benefit.icon]}
              </div>
              <EditableText
                content={benefit.title}
                onChange={(value) => updateContent(`coreBenefits.benefits[${index}].title`, value)}
                className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 leading-tight"
                as="h3"
              />
              <EditableText
                content={benefit.description}
                onChange={(value) => updateContent(`coreBenefits.benefits[${index}].description`, value)}
                className="text-base sm:text-lg text-gray-600 leading-relaxed"
              />
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12">
          <EditableText
            content={initialContent.subtitle}
            onChange={(value) => updateContent('coreBenefits.subtitle', value)}
            className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-10"
          />
          <div className="flex justify-center">
            <CTAButton text="Let's Go" variant="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}