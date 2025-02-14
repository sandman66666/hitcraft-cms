import React from 'react';
import { TestimonialsContent } from "../../../types/content";

interface SocialProofSectionProps {
  content: TestimonialsContent;
}

const testimonials = [
  {
    quote: "It's like having a professional producer, co-writer, and industry mentor available 24/7. Game-changing for my creative process.",
    author: "Sarah K.",
    role: "Songwriter",
    image: "/assets/images/about-us/members/Rachel.jpg"
  },
  {
    quote: "Finally, an AI tool that actually helps you grow as an artist instead of just pushing buttons.",
    author: "Mike R.",
    role: "Producer",
    image: "/assets/images/about-us/members/Tamir.jpg"
  },
  {
    quote: "The ability to get both guidance and instant execution is incredible. Saves me so much time and helps me deliver better results to clients.",
    author: "David M.",
    role: "Composer",
    image: "/assets/images/about-us/members/Yan.jpg"
  }
];

export default function SocialProofSection({ content }: SocialProofSectionProps) {
  return (
    <section className="w-full min-h-[100vh] min-h-[100svh] py-16 sm:py-24 relative bg-gradient-to-b from-gray-900 to-purple-900 overflow-hidden scroll-snap-align-start">
      <div className="absolute inset-0 bg-[url('/assets/images/bg/2xl_bg.png')] bg-cover bg-center opacity-10" />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-[30px] font-extralight mb-6 text-gray-100 font-poppins [text-shadow:1px_1px_4px_rgba(0,0,0,0.3)]">
            SOCIAL PROOF:
          </h2>
          <h3 className="text-4xl sm:text-5xl lg:text-[72px] font-extralight mb-12 text-white font-poppins [text-shadow:1px_1px_4px_rgba(0,0,0,0.3)]">
            Join <span className="font-[800]">100,000+</span> Music Creators
          </h3>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Already Using HitCraft
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="p-8 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/10 relative min-h-[400px]"
            >
              <div className="flex items-center justify-center mb-8">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-20 h-20 rounded-full shadow-md object-cover"
                />
              </div>
              <p className="text-lg sm:text-xl text-gray-200 mb-16 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 text-lg">
                <span className="font-semibold text-white">{testimonial.author}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-300">{testimonial.role}</span>
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