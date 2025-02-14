import React from 'react';
import { UniqueApproachContent } from "../../../types/content";

interface UniqueApproachSectionProps {
  content: UniqueApproachContent;
}

const features = [
  {
    icon: 'chat',
    title: ['Chat', 'Naturally'],
    description: 'Just describe what you want in plain language - no need to learn complex tools or technical jargon.'
  },
  {
    icon: 'lightbulb',
    title: ['Get Expert', 'Guidance'],
    description: 'Receive professional advice on any music-related topic, from creative direction to industry insights.'
  },
  {
    icon: 'play',
    title: ['See Instant', 'Results'],
    description: "Don't just get suggestions - hear your ideas come to life professionally in seconds."
  },
  {
    icon: 'chart',
    title: ['Grow Your', 'Skills'],
    description: 'Learn as you create with explanations and tips from your AI mentor that help you improve.'
  }
];

const iconMap: { [key: string]: JSX.Element } = {
  chat: (
    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  ),
  lightbulb: (
    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  play: (
    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  chart: (
    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  )
};

export default function UniqueApproachSection({ content }: UniqueApproachSectionProps) {
  const title = "UNIQUE APPROACH:";
  const subtitleParts = ["A ", "New Way ", "to Create Music"];

  return (
    <section className="w-full min-h-[100vh] min-h-[100svh] py-16 sm:py-24 relative bg-gradient-to-br from-purple-50 to-white overflow-hidden scroll-snap-align-start">
      <div className="absolute inset-0 bg-[url('/assets/images/bg/2xl_bg.png')] bg-cover bg-center opacity-5" />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-[30px] font-extralight mb-6 text-gray-900 font-poppins [text-shadow:1px_1px_4px_rgba(0,0,0,0.1)]">
            {title}
          </h2>
          <h3 className="text-4xl sm:text-5xl lg:text-[72px] font-extralight mb-8 text-gray-900 font-poppins [text-shadow:1px_1px_4px_rgba(0,0,0,0.1)]">
            {subtitleParts.map((part, index) => (
              <span key={index} className={index === 1 ? 'font-[800]' : ''}>
                {part}
              </span>
            ))}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[#8a44c8] to-[#df0c39] rounded-full flex items-center justify-center shadow-md">
                {iconMap[feature.icon]}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 leading-tight text-center min-h-[4em] flex flex-col items-center justify-center">
                {feature.title.map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Added mt-[50px] to push the button down by 50px */}
        <div className="text-center mt-[50px]">
          <button className="bg-white text-purple-700 px-8 py-4 rounded-full text-lg font-[700] transition-all duration-300 hover:scale-105 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0px_6px_16px_rgba(0,0,0,0.3)] transform hover:-translate-y-0.5 flex items-center justify-center w-full sm:w-auto min-w-[200px] mx-auto">
            LET'S GO!
          </button>
        </div>
      </div>
    </section>
  );
}