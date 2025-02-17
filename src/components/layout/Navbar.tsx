import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { to: "/why-hitcraft", text: "Why HitCraft" },
    { to: "/about", text: "About" },
    { to: "/contact", text: "Contact" }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center ${isScrolled ? 'h-24' : 'h-36'} transition-all duration-500`}>
          <img
            src="/assets/images/logo.webp"
            alt="HitCraft"
            className={`${isScrolled ? 'h-16' : 'h-20'} w-auto my-auto transition-all duration-500 ${isScrolled ? '' : 'filter invert brightness-0 invert'}`}
          />

          <div className="flex items-center space-x-6">
            <Link
              to="/login"
              className={`text-lg font-medium transition-colors ${
                isScrolled ? 'text-black hover:text-black/70' : 'text-white hover:text-white/70'
              }`}
            >
              Login
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-all duration-500 ${
                isScrolled ? 'text-black hover:text-black/70' : 'text-white hover:text-white/70'
              }`}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`block ${isScrolled ? 'h-8 w-8' : 'h-10 w-10'} transition-all duration-500`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Menu Overlay */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-black/[0.98] backdrop-blur-lg">
              <div className="max-w-7xl mx-auto px-4 py-8">
                {menuItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="block py-4 text-lg font-medium text-white hover:text-white/70 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.text}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}