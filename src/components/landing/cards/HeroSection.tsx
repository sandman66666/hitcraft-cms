import { HeroContent } from "../../../types/content";
import { CTAButton } from "@/components/shared/CTAButton";

interface HeroSectionProps {
  content: HeroContent;
}

export default function HeroSection({ content }: HeroSectionProps) {
  const titleWords = "Your AI-Powered Music Assistant".split(' ');

  return (
    <section className="w-full h-[100vh] h-[100svh] min-h-[600px] flex items-center justify-center relative bg-gradient-to-br from-purple-50 to-white overflow-hidden" aria-label="Hero">
      <div className="absolute inset-0 bg-[url('/assets/images/bg/2xl_bg.png')] bg-cover bg-center opacity-5" />
      <div className="text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <p className="text-xl sm:text-2xl italic text-gray-900 mb-12 animate-fade-in font-poppins">
          {content.title}
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[6rem] font-extralight mb-12 font-poppins bg-gradient-to-r from-[#A533FF] to-[#ff3366] text-transparent bg-clip-text leading-[1.15] max-w-4xl mx-auto">
          {titleWords.map((word, index) => (
            <span key={index} className={word === "AI-Powered" ? 'font-black' : ''}>
              {word}{' '}
            </span>
          ))}
        </h1>
        <p className="text-[1.35rem] sm:text-[1.45rem] mb-12 text-gray-800 max-w-3xl mx-auto font-light leading-relaxed tracking-[0.02em]">
          {content.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
          {content.button && (
            <CTAButton 
              className="bg-white/[0.15] text-white border-2 border-white/40 px-8 py-4 rounded-full text-xl sm:text-2xl font-medium transition-all duration-300 hover:bg-white/25 hover:border-white/60 hover:scale-105 hover:shadow-[0px_4px_12px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 flex items-center justify-center w-full sm:w-auto min-w-[200px]"
              text={content.button.text}
            />
          )}
        </div>
      </div>
    </section>
  );
}