import { DemoContent } from "../../../types/content";

interface SongwritersSectionProps {
  content: DemoContent;
}

export default function SongwritersSection({ content }: SongwritersSectionProps) {
  const title = "SONGWRITERS:";
  const subtitle = "Your Personal Writing Partner & Producer";
  const subtitleParts = ["Your ", "Personal Writing ", "Partner & Producer"];

  return (
    <section className="w-full min-h-[100vh] min-h-[100svh] py-16 sm:py-24 relative bg-gradient-to-br from-purple-900 to-red-900 overflow-hidden scroll-snap-align-start">
      <div className="absolute inset-0 bg-[url('/assets/images/bg/2xl_bg.png')] bg-cover bg-center opacity-5" />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-[30px] font-extralight mb-6 text-white font-poppins [text-shadow:1px_1px_4px_rgba(0,0,0,0.2)]">{title}</h2>
          <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-extralight mb-8 text-white font-poppins [text-shadow:1px_1px_4px_rgba(0,0,0,0.2)]">
            {subtitleParts.map((part, index) => (
              <span key={index} className={index === 1 ? 'font-[800]' : ''}>
                {part}
              </span>
            ))}
          </h3>
          <p className="text-lg sm:text-xl lg:text-2xl mb-12 text-gray-200 max-w-5xl mx-auto leading-relaxed">
            Just like chatting with an experienced co-writer and producer who's available 24/7:
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 sm:p-10 mb-12 max-w-2xl mx-auto shadow-[0px_4px_24px_rgba(0,0,0,0.1)]">
          <ul className="text-left text-base sm:text-lg lg:text-xl text-gray-200 space-y-6 sm:space-y-8">
            <li className="flex items-center">
              <span className="text-white mr-4 text-2xl">•</span>
              "Help me find the right words for this feeling..."
            </li>
            <li className="flex items-center">
              <span className="text-white mr-4 text-2xl">•</span>
              "What melody would work over these chords?"
            </li>
            <li className="flex items-center">
              <span className="text-white mr-4 text-2xl">•</span>
              "Can you suggest a better chorus structure?"
            </li>
            <li className="flex items-center">
              <span className="text-white mr-4 text-2xl">•</span>
              "Make this demo sound professional"
            </li>
          </ul>
        </div>

        <div className="text-center">
          <p className="text-lg sm:text-xl lg:text-2xl mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            HitCraft helps you express your ideas and get them produced just the way you imagine - without the technical hassle.
          </p>
          <button className="bg-white text-purple-700 px-8 py-4 rounded-full text-lg font-[700] transition-all duration-300 hover:scale-105 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0px_6px_16px_rgba(0,0,0,0.3)] transform hover:-translate-y-0.5 flex items-center justify-center w-full sm:w-auto min-w-[200px] mx-auto">
            LET'S GO!
          </button>
        </div>
      </div>
    </section>
  );
}
