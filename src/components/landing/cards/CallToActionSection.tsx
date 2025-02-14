import React from 'react';
import { CTAButton } from '@/components/shared/CTAButton';
import { CallToActionContent } from '../../../types/content';

interface CallToActionSectionProps {
  content: CallToActionContent;
}

export default function CallToActionSection({ content }: CallToActionSectionProps) {
  return (
    <section className="w-full min-h-[100vh] min-h-[100svh] bg-gradient-to-br from-[#1e2128] to-[#252931] pt-16 pb-8 sm:pt-24 sm:pb-12 relative overflow-hidden scroll-snap-align-start">
      <div className="absolute inset-0 bg-[url('/assets/images/bg/2xl_bg.png')] bg-cover bg-center opacity-5" />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center h-full">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-[30px] font-extralight mb-6 text-gray-100 font-poppins [text-shadow:1px_1px_4px_rgba(0,0,0,0.3)]">
            CALL TO ACTION:
          </h2>
          <h3 className="text-4xl sm:text-5xl lg:text-[72px] font-extralight mb-12 text-white font-poppins [text-shadow:1px_1px_4px_rgba(0,0,0,0.3)] leading-tight">
            {content.title.split(' ').slice(0, 2).join(' ')}<br />
            {content.title.split(' ').slice(2).join(' ')}
          </h3>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-16">
            {content.subtitle}
          </p>
          <CTAButton text={content.button.text} />
          <div className="mt-8 text-gray-400">
            {content.features.join(' • ')}
          </div>
        </div>
      </div>
    </section>
  );
}
