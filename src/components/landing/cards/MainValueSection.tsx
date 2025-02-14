import React from 'react';

const MainValueSection: React.FC = () => {
  const questions = [
    "How can I make this chorus hit harder?",
    "What chord progression would work here?",
    "Help me write lyrics about...",
    "Can you produce this in a pop style?"
  ];

  return (
    <section className="w-full h-[100vh] h-[100svh] min-h-[600px] flex items-center justify-center relative bg-gradient-to-r from-purple-800 to-pink-600 text-white py-12 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-snap-align-start">
      <div className="absolute inset-0 bg-[url('/assets/images/bg/2xl_bg.png')] bg-cover bg-center opacity-5" />
      <div className="w-full max-w-4xl mx-auto relative z-10">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-poppins font-extralight mb-8 text-center text-[#1a1a1a] leading-[1.2] [text-shadow:1px_1px_4px_rgba(0,0,0,0.15)]">
            More Than <span className="font-[800]">Just Another</span><br />
            <span className="text-[#111111] [text-shadow:1px_1px_4px_rgba(0,0,0,0.2)]">AI Music Tool</span>
          </h2>
          
          <p className="text-xl sm:text-2xl mb-12 text-gray-100 mx-auto [text-shadow:0px_2px_4px_rgba(0,0,0,0.1)] leading-[1.5] max-w-[800px]">
            HitCraft is your always-available creative companion - combining conversational AI 
            guidance with professional execution. Whether you need creative direction, technical 
            help, or full production support, just ask and get instant results.
          </p>

          <div className="bg-white/[0.12] backdrop-blur-sm rounded-2xl p-8 mb-12 max-w-2xl mx-auto shadow-[0_4px_12px_rgba(0,0,0,0.1),inset_0px_2px_10px_rgba(0,0,0,0.1)] border border-white/10">
            <h3 className="text-2xl sm:text-3xl font-medium mb-8 text-white [text-shadow:0px_2px_4px_rgba(0,0,0,0.1)]">Ask Questions Like:</h3>
            <ul className="text-left text-lg sm:text-xl text-gray-100 space-y-6 leading-[1.4]">
              {questions.map((question, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-white mr-3">•</span>
                  "{question}"
                </li>
              ))}
            </ul>
          </div>

          {/* Moved "Let's Go" button to the bottom and added 50px padding to the top */}
          <div className="mt-12 pt-[62px] border-t border-white/20"> {/* Changed pt-12 to pt-[62px] to add 50px */}
            <div className="flex items-center justify-center">
              <button className="bg-white text-purple-700 px-8 py-4 rounded-full text-lg font-[700] transition-all duration-300 hover:scale-105 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0px_6px_16px_rgba(0,0,0,0.3)] transform hover:-translate-y-0.5">
                LET'S GO!
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainValueSection;