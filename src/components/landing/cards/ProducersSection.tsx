import React from 'react';
import { WritersBlockContent } from "../../../types/content";

interface ProducersSectionProps {
  content: WritersBlockContent;
}

export default function ProducersSection({ content }: ProducersSectionProps) {
  const title = "PRODUCERS:";
  const subtitleParts = ["Your ", "Production Mentor", " & Sound Explorer"];

  return (
    <section className="w-full min-h-[100vh] min-h-[100svh] py-16 sm:py-24 relative bg-gradient-to-br from-purple-900 to-red-900 overflow-hidden scroll-snap-align-start">
      <div className="absolute inset-0 bg-[url('/assets/images/bg/2xl_bg.png')] bg-cover bg-center opacity-5" />
      <div className="absolute right-0 bottom-0 w-3/4 h-3/4 bg-[url('/assets/images/landing/layer-1@3x.webp')] bg-no-repeat bg-right-bottom bg-contain opacity-10" />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-2 mb-[-5]">
            <h2 className="text-2xl sm:text-3xl lg:text-[30px] font-extralight mb-6 font-poppins text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.2)]">
              {title}
            </h2>
            <h3 className="text-4xl sm:text-5xl lg:text-[72px] font-extralight leading-tight font-poppins text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.2)]">
              {subtitleParts.map((part, index) => (
                <span key={index} className={index === 1 ? 'font-[800]' : ''}>
                  {part}
                </span>
              ))}
            </h3>
          </div>
          <div className="text-white lg:col-span-2 xl:col-span-1">
            <p className="text-lg sm:text-xl lg:text-2xl mb-12 text-gray-200 max-w-5xl leading-relaxed">
              Like having a veteran producer guide you while handling the technical heavy lifting:
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 sm:p-10 mb-12 max-w-2xl shadow-[0px_4px_24px_rgba(0,0,0,0.1)]">
              <ul className="text-left text-base sm:text-lg lg:text-xl text-gray-200 space-y-6 sm:space-y-8">
                <li className="flex items-center">
                  <span className="text-white mr-4 text-2xl">•</span>
                  "How would this sound in a modern pop style?"
                </li>
                <li className="flex items-center">
                  <span className="text-white mr-4 text-2xl">•</span>
                  "Help me create a unique beat for this"
                </li>
                <li className="flex items-center">
                  <span className="text-white mr-4 text-2xl">•</span>
                  "What's missing from this mix?"
                </li>
                <li className="flex items-center">
                  <span className="text-white mr-4 text-2xl">•</span>
                  "Generate some fresh ideas in this genre"
                </li>
              </ul>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl mb-12 text-gray-200 max-w-3xl leading-relaxed">
              Get unstuck instantly and explore new creative directions with professional-quality results.
            </p>
            <button className="bg-white text-purple-700 px-8 py-4 rounded-full text-lg font-[700] transition-all duration-300 hover:scale-105 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0px_6px_16px_rgba(0,0,0,0.3)] transform hover:-translate-y-0.5 flex items-center justify-center w-full sm:w-auto min-w-[200px]">
              LET'S GO!
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}