import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PathType = "producer" | "songwriter" | "dj" | "bedroom" | "film";

const paths: PathType[] = ["producer", "songwriter", "dj", "bedroom", "film"];

const pathTitles = {
  producer: "Your Virtual Production Mentor",
  songwriter: "From Demo To Hit",
  dj: "Basic Rhythms Turned Pro",
  bedroom: "Access World-Class Expertise",
  film: "Complete Scores In Seconds",
};

const pathLabels = {
  producer: "Music Producers",
  songwriter: "Songwriters and Composers",
  dj: "DJ's and Beat-makers",
  bedroom: "Bedroom producers",
  film: "Film and media composers",
};

const pathContent = {
  producer:
    "Transform your workflow from tedious to brilliant. Get instant DAW guidance, mixing tips, and genre-specific production techniques. Turn rough demos into polished tracks with professional-grade sound design and arrangements. Your virtual production mentor for every session.",
  songwriter:
    "Focus on your creative vision while HitCraft handles the technical heavy lifting. Get intelligent suggestions for chord progressions, harmonies, and arrangements. Transform simple melodies into fully orchestrated pieces. From writer's block breakthroughs to final arrangements - your ideas deserve to be heard.",
  dj: "Level up your beat game with instant access to genre-specific techniques, drum programming expertise, and sound selection guidance. Turn basic rhythms into professional beats with industry-standard sound design and arrangement tools. Your virtual collaborator for crafting hits.",
  bedroom:
    "Skip years of trial and error. Get professional guidance on your DAW, mixing techniques, and production workflows. Transform your home recordings into studio-quality tracks with instant access to professional-grade production tools and expertise. Your path to pro-level results.",
  film: "Meet tight deadlines with confidence. Get instant help with orchestration, sound design, and genre-matching. Transform brief sketches into complete scores ready for any media project. Your reliable partner for professional composition delivery.",
};

const PathSelection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTouching, setIsTouching] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchOffset, setTouchOffset] = useState(0);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const minSwipeDistance = 50;

  const getPathIndex = (offset: number) => {
    const newIndex = currentIndex + offset;
    if (newIndex < 0) return paths.length - 1;
    if (newIndex >= paths.length) return 0;
    return newIndex;
  };

  const prevPath = paths[getPathIndex(-1)];
  const currentPath = paths[currentIndex];
  const nextPath = paths[getPathIndex(1)];

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouching(true);
    setTouchStartX(e.touches[0].clientX);
    setTouchOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouching) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX;
    setTouchOffset(diff);
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
    if (Math.abs(touchOffset) > minSwipeDistance) {
      if (touchOffset > 0) {
        setCurrentIndex(getPathIndex(-1));
      } else {
        setCurrentIndex(getPathIndex(1));
      }
    }
    setTouchOffset(0);
  };

  return (
    <>
      <div className="px-6 sm:px-8 lg:px-24 xl:px-32">
        <p className="text-2xl sm:text-4xl 3xl:text-5xl mb-7 lg:mb-10 text-center text-black">
          <span className="font-light">Perfect Your Process, </span>
          <span className="font-bold">Whatever Your Path</span>
        </p>
      </div>

      <div className="relative mb-32 px-6 sm:px-8 lg:px-24 xl:px-32 max-w-[1440px] mx-auto">
        <div className="w-full relative text-white rounded-3xl bg-gradient-to-br from-[#8a44c8] to-[#df0c39] shadow-lg p-8">
          {/* Background decoration */}
          <div className="absolute -bottom-12 -right-12 w-36 h-36 -z-10 rounded-full border-2 border-white/30 bg-gradient-to-br from-white/5 to-transparent"></div>

          <div
            ref={containerRef}
            className={`relative backdrop-blur-sm bg-white/5 rounded-2xl p-6 md:p-8 min-h-[400px] transition-transform duration-300 ${
              isTouching ? "scale-98" : ""
            }`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              transform: `scale(${isTouching ? 0.98 : 1}) translateX(${
                touchOffset * 0.2
              }px)`,
              transition: isTouching ? "none" : "all 0.3s ease-out",
            }}
          >
            {/* Navigation Buttons */}
            <button
              onClick={() => setCurrentIndex(getPathIndex(-1))}
              className="absolute top-1/2 -translate-y-1/2 left-2 md:left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentIndex(getPathIndex(1))}
              className="absolute top-1/2 -translate-y-1/2 right-2 md:right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Content */}
            <div className="flex flex-col items-center justify-center text-center px-4 md:px-16">
              {/* Path Labels Row */}
              <div className="flex items-center justify-center w-full mb-6 overflow-hidden">
                <div className="flex items-center gap-6">
                  {/* Previous Label */}
                  <div className="hidden md:block text-base text-white/40 transform transition-all duration-300">
                    {pathLabels[prevPath]}
                  </div>

                  {/* Current Label */}
                  <div
                    className="text-xl md:text-2xl font-medium transform transition-all duration-300"
                    style={{
                      transform: `translateX(${touchOffset * 0.1}px)`,
                    }}
                  >
                    {pathLabels[currentPath]}
                  </div>

                  {/* Next Label */}
                  <div className="hidden md:block text-base text-white/40 transform transition-all duration-300">
                    {pathLabels[nextPath]}
                  </div>
                </div>
              </div>

              {/* Title and Content */}
              <div
                className="transition-opacity duration-300"
                style={{
                  opacity: isTouching ? 0.8 : 1,
                  transform: `translateX(${touchOffset * 0.1}px)`,
                }}
              >
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  {pathTitles[currentPath]}
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-white/90 max-w-2xl mb-8">
                  {pathContent[currentPath]}
                </p>
              </div>

              {/* Pagination Dots */}
              <div className="flex gap-2 mb-8">
                {paths.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-white w-6"
                        : "bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Sign Up Button */}
              <button
                onClick={() => navigate("/login")}
                className="bg-white/20 hover:bg-white/25 text-white px-16 py-5 rounded-xl text-xl font-medium transition-all duration-300 min-w-[280px]"
              >
                <span>SIGN UP FOR FREE NOW</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PathSelection;
