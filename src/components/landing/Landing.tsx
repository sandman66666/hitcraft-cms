import { useRef } from "react";
import { CTAButton } from "@/components/shared/CTAButton";
import LandingDemo from "./LandingDemo";

const testimonials = [
  {
    name: "Samuel Pesci",
    role: "Music Producer",
    text: "This tool is a game-changer! As a producer, the efficiency and precision it offers in transforming basic sketches into polished tracks is unparalleled.",
  },
  {
    name: "Jess Penny",
    role: "Singer-songwriter",
    text: "As a musician who's trying to build her way up in the business I can testify that this AI tool has been a real lifesaver for me.",
  },
  {
    name: "Christopher Peter",
    role: "Musician and Sound Engineer",
    text: "I've seen a few things in the music industry, but this thing still managed to impress me. It's intuitive, smart and makes the production process so smooth.",
  },
];

export default function Landing() {
  const sectionsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="landing flex flex-col">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-purple-50 to-white pt-20" aria-label="Hero">
        <div className="absolute inset-0 bg-[url('/assets/images/bg/2xl_bg.png')] bg-cover bg-center opacity-5" />
        <div className="text-center max-w-5xl mx-auto px-4 sm:px-8 py-24 md:py-32 relative z-10">
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-light mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#8a44c8] to-[#df0c39] animate-fade-in">
            The ChatGPT{" "}
            <strong className="font-bold block mt-2">For Music Creators</strong>
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl font-medium mb-16 text-gray-700 max-w-3xl mx-auto animate-fade-in-delay">
            Turn your musical ideas into standout songs with HitCraft —{" "}
            <span className="block mt-2">
              your partner in every stage of songwriting
            </span>
          </p>
          <div className="flex justify-center animate-fade-in-delay-2">
            <CTAButton className="text-xl py-6 px-12 rounded-xl bg-gradient-to-r from-[#8a44c8] to-[#df0c39] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" />
          </div>
        </div>
      </section>

      {/* Animation Section */}
      <section className="w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black relative overflow-hidden py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-light text-white mb-8">
            Experience the <strong className="font-bold">Future of Music Creation</strong>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Watch how HitCraft transforms your musical ideas into professional tracks
          </p>
          <div className="aspect-video bg-black/50 rounded-2xl shadow-2xl backdrop-blur-sm">
            <p className="text-2xl text-white/80 h-full flex items-center justify-center">
              Product Animation Coming Soon
            </p>
          </div>
        </div>
      </section>

      {/* Produce Your Song Section */}
      <section className="w-full min-h-screen flex items-center relative bg-gradient-to-br from-purple-900 to-red-900 py-24">
        <div className="absolute inset-0 bg-[url('/assets/images/bg/2xl_bg.png')] bg-cover bg-center opacity-5" />
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="text-white text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-light mb-8">
              Produce Your Song{" "}
              <span className="font-bold block mt-2">Instantly</span>
            </h2>
            <p className="text-xl lg:text-2xl mb-12 text-gray-200 max-w-xl">
              Whether you're in search of creative ideas or release-ready sounds, 
              HitCraft turns demos into polished songs on the spot.
            </p>
            <div className="flex justify-center lg:justify-start">
              <CTAButton className="text-xl py-6 px-12 rounded-xl bg-white text-[#8a44c8] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" />
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-[#8a44c8] to-[#df0c39] rounded-2xl blur-xl opacity-20 transform -rotate-6"></div>
              <img
                src="/assets/images/landing/layer-3433@3x.png"
                alt="AI-powered instant music production interface"
                className="relative w-full rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Writer's Block Section */}
      <section className="w-full min-h-screen flex items-center relative bg-gradient-to-br from-white to-purple-50 py-24">
        <div className="absolute inset-0 bg-[url('/assets/images/bg/2xl_bg.png')] bg-cover bg-center opacity-10" />
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-[#8a44c8] to-[#df0c39] rounded-2xl blur-xl opacity-20 transform rotate-6"></div>
              <img
                src="/assets/images/landing/layer-3429@3x.png"
                alt="Creative songwriting assistance visualization"
                className="relative w-full rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-light mb-8">
              Overcome Your{" "}
              <span className="font-bold block mt-2">Writer's Block</span>
            </h2>
            <p className="text-xl lg:text-2xl mb-12 text-gray-700 max-w-xl">
              HitCraft is your personal music mentor, ready to elevate your creative 
              process whenever you're stuck—from lyrics and composition to distribution.
            </p>
            <div className="flex justify-center lg:justify-start">
              <CTAButton className="text-xl py-6 px-12 rounded-xl bg-gradient-to-r from-[#8a44c8] to-[#df0c39] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" />
            </div>
          </div>
        </div>
      </section>

      {/* Music Mentor Section */}
      <section className="w-full min-h-screen flex items-center relative bg-gradient-to-br from-red-900 to-purple-900 py-24">
        <div className="absolute inset-0 bg-[url('/assets/images/bg/2xl_bg.png')] bg-cover bg-center opacity-5" />
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="text-white text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-light mb-8">
              Collaborate With{" "}
              <span className="font-bold block mt-2">Your Music Mentor</span>
            </h2>
            <p className="text-xl lg:text-2xl mb-12 text-gray-200 max-w-xl">
              HitCraft is your professional AI co-creator, always ready to offer guidance, 
              fresh ideas, and support for every step of your musical journey.
            </p>
            <div className="flex justify-center lg:justify-start">
              <CTAButton className="text-xl py-6 px-12 rounded-xl bg-white text-[#8a44c8] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" />
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-[#8a44c8] to-[#df0c39] rounded-2xl blur-xl opacity-20 transform -rotate-6"></div>
              <img
                src="/assets/images/landing/layer-538@3x.png"
                alt="AI music mentor collaboration interface"
                className="relative w-full rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Perfect Your Process Section */}
      <section className="w-full min-h-screen flex items-center relative bg-gradient-to-br from-purple-600 to-pink-600 py-24">
        <div className="absolute inset-0 bg-[url('/assets/images/bg/2xl_bg.png')] bg-cover bg-center opacity-5" />
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl text-center font-light text-white mb-16">
            Perfect Your Process, <span className="font-bold">Whatever Your Path</span>
          </h2>

          <div className="relative">
            {/* Carousel Content */}
            <div className="text-center text-white max-w-4xl mx-auto">
              <div className="flex justify-center gap-8 text-xl lg:text-2xl mb-8">
                <span className="opacity-50">Film and media composers</span>
                <span className="font-medium">Music Producers</span>
                <span className="opacity-50">Songwriters and Composers</span>
              </div>

              <h3 className="text-4xl sm:text-5xl font-bold mb-8">
                Your Virtual Production Mentor
              </h3>

              <p className="text-xl lg:text-2xl mb-12 max-w-3xl mx-auto">
                Transform your workflow from tedious to brilliant. Get instant DAW guidance, 
                mixing tips, and genre-specific production techniques. Turn rough demos into 
                polished tracks with professional-grade sound design and arrangements. Your 
                virtual production mentor for every session.
              </p>

              <button className="bg-white/20 hover:bg-white/30 text-white text-xl font-medium px-16 py-5 rounded-xl transition-all duration-300 hover:transform hover:-translate-y-1 shadow-lg hover:shadow-xl backdrop-blur-sm">
                SIGN UP FOR FREE NOW
              </button>

              {/* Carousel Navigation */}
              <div className="flex justify-center gap-2 mt-12">
                <button className="w-8 h-2 rounded-full bg-white"></button>
                <button className="w-2 h-2 rounded-full bg-white/50"></button>
                <button className="w-2 h-2 rounded-full bg-white/50"></button>
                <button className="w-2 h-2 rounded-full bg-white/50"></button>
              </div>

              {/* Carousel Arrows */}
              <button className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full bg-[#252931] py-24" aria-label="Testimonials">
        <div className="w-full px-4 sm:px-8 lg:px-24">
          <h2 className="text-5xl sm:text-6xl text-center font-light text-white mb-16">
            What Our <span className="font-bold">Users Say</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 hover:transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <div className="bg-white/5 rounded-2xl p-6 mb-6">
                  <div className="flex justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-6 h-6 text-yellow-300 mx-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-lg lg:text-xl text-center text-white leading-relaxed">
                    {testimonial.text}
                  </p>
                </div>
                <div className="text-center text-white">
                  <p className="text-2xl font-bold mb-2">{testimonial.name}</p>
                  <p className="text-lg text-gray-300">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section aria-label="Demo">
        <LandingDemo />
      </section>
    </div>
  );
}