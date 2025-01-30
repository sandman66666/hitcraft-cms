  export default function HowHitcraftWorks() {
  return (
    <div aria-labelledby="how-hitcraft-works-title">
      <h2 id="how-hitcraft-works-title" className="text-2xl sm:text-3xl lg:text-4xl text-center font-light mb-8 sm:mb-12">
        How <span className="font-bold">HitCraft</span> Helps Songwriters
      </h2>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto list-none" role="list">
        {/* Break Through Writer's Block */}
        <li className="group bg-white/20 hover:bg-white/30 rounded-xl p-4 sm:p-6 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-start gap-3 mb-2">
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                role="img"
                aria-label="Writer's Block Icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l-5-5m0 0l5-5m-5 5h12"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-medium text-black">
                Break Through Writer's Block
              </h3>
              <p className="text-sm sm:text-base text-black/70 mt-1">
                Need fresh chord progression ideas? HitCraft sparks fresh ideas
                to keep your creativity flowing.
              </p>
            </div>
          </div>
        </li>

        {/* Find Inspiration */}
        <li className="group bg-white/20 hover:bg-white/30 rounded-xl p-4 sm:p-6 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-start gap-3 mb-2">
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                role="img"
                aria-label="Inspiration Icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-medium text-black">
                Find Inspiration
              </h3>
              <p className="text-sm sm:text-base text-black/70 mt-1">
                Explore new sounds and production styles to ignite your next
                great song.
              </p>
            </div>
          </div>
        </li>

        {/* Compose in Any Style */}
        <li className="group bg-white/20 hover:bg-white/30 rounded-xl p-4 sm:p-6 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-start gap-3 mb-2">
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                role="img"
                aria-label="Music Style Icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 11a4 4 0 01-8 0M7 11V3a1 1 0 011-1h8a1 1 0 011 1v8l-2.5-2.5L12 13l-2.5-2.5L7 13V11z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-medium text-black">
                Compose in Any Style
              </h3>
              <p className="text-sm sm:text-base text-black/70 mt-1">
                Whether it's pop, rock, or jazz, HitCraft can turn your demo
                into a hit.
              </p>
            </div>
          </div>
        </li>

        {/* Finish Your Lyrics */}
        <li className="group bg-white/20 hover:bg-white/30 rounded-xl p-4 sm:p-6 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-start gap-3 mb-2">
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                role="img"
                aria-label="Lyrics Writing Icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-medium text-black">
                Finish Your Lyrics
              </h3>
              <p className="text-sm sm:text-base text-black/70 mt-1">
                When you're stuck on a verse, you can ask HitCraft to help you
                complete your lyrics.
              </p>
            </div>
          </div>
        </li>

        {/* Expand Musical Knowledge */}
        <li className="group bg-white/20 hover:bg-white/30 rounded-xl p-4 sm:p-6 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-start gap-3 mb-2">
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                role="img"
                aria-label="Musical Knowledge Icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-medium text-black">
                Expand Your Musical Knowledge
              </h3>
              <p className="text-sm sm:text-base text-black/70 mt-1">
                Access tips, techniques, and insights to improve your
                songwriting skills.
              </p>
            </div>
          </div>
        </li>

        {/* Collaborate with Pro */}
        <li className="group bg-white/20 hover:bg-white/30 rounded-xl p-4 sm:p-6 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-start gap-3 mb-2">
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                role="img"
                aria-label="Collaboration Icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-medium text-black">
                Collaborate with a Pro
              </h3>
              <p className="text-sm sm:text-base text-black/70 mt-1">
                Tap into expertise based on legendary producers with AI-powered
                precision.
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
