import React from 'react';
import { CTAButton } from '@/components/shared/CTAButton';
import { CallToActionContent } from '../../../types/content';

interface CallToActionSectionProps {
  content: CallToActionContent;
}

export default function CallToActionSection({ content }: CallToActionSectionProps) {
  return (
    <section className="w-full bg-gradient-to-br from-pink-50 to-white pt-12 pb-3 sm:pt-16 sm:pb-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/images/bg/2xl_bg.png')] bg-cover bg-center opacity-5" />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="text-[24px] font-extralight mb-4 text-gray-800 font-poppins">
            CALL TO ACTION:
          </h2>
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extralight mb-8 text-gray-900 font-poppins leading-tight">
            {content.title.split(' ').slice(0, 2).join(' ')}<br />
            {content.title.split(' ').slice(2).join(' ')}
          </h3>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-10">
            {content.subtitle}
          </p>
          <CTAButton text={content.button.text} />
          <div className="mt-6 text-gray-600 text-sm sm:text-base">
            {content.features.join(' • ')}
          </div>
        </div>
      </div>
    </section>
  );
}
