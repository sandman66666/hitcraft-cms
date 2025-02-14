import React from 'react';
import { SocialProofContent } from '../../../types/content';

interface SocialProofSectionProps {
  content: SocialProofContent;
}

export default function SocialProofSection({ content }: SocialProofSectionProps) {
  // Update the image of the third testimonial
  const updatedTestimonials = content.testimonials.map((testimonial, index) => {
    if (index === 2) {
      return {
        ...testimonial,
        image: "/assets/images/about-us/members/01_oudi.webp"
      };
    }
    return testimonial;
  });

  return (
    <section className="w-full min-h-[100vh] min-h-[100svh] bg-gradient-to-br from-[#1e2128] to-[#252931] py-16 sm:py-24 relative overflow-hidden scroll-snap-align-start">
      <div className="absolute inset-0 bg-[url('/assets/images/bg/2xl_bg.png')] bg-cover bg-center opacity-5" />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-[30px] font-extralight mb-6 text-gray-100 font-poppins [text-shadow:1px_1px_4px_rgba(0,0,0,0.3)]">
            {content.title}
          </h2>
          <h3 className="text-4xl sm:text-5xl lg:text-[72px] font-extralight text-white font-poppins [text-shadow:1px_1px_4px_rgba(0,0,0,0.3)]">
            {content.subtitle}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {updatedTestimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl relative min-h-[400px]"
            >
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="flex items-center mt-4">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-white font-medium">{testimonial.author}</p>
                    <p className="text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-white text-purple-700 px-8 py-4 rounded-full text-lg font-[700] transition-all duration-300 hover:scale-105 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0px_6px_16px_rgba(0,0,0,0.3)] transform hover:-translate-y-0.5 flex items-center justify-center w-full sm:w-auto min-w-[200px] mx-auto">
            LET'S GO!
          </button>
        </div>
      </div>
    </section>
  );
}