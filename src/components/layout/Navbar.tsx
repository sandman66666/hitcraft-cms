import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/assets/images/logo.svg"
              alt="HitCraft"
              className={`h-8 w-auto ${isScrolled ? '' : 'filter invert brightness-0 invert'}`}
            />
          </Link>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/why-hitcraft"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isScrolled ? 'text-black hover:text-black/70' : 'text-white hover:text-white/70'
              }`}
            >
              Why HitCraft
            </Link>
            <Link 
              to="/about"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isScrolled ? 'text-black hover:text-black/70' : 'text-white hover:text-white/70'
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isScrolled ? 'text-black hover:text-black/70' : 'text-white hover:text-white/70'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Login Button */}
          <div className="hidden md:flex items-center">
            <Link
              to="/login"
              className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#8a44c8] to-[#df0c39] hover:opacity-90 transition-opacity"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#8a44c8] transition-colors ${
                isScrolled ? 'text-black hover:text-black/70' : 'text-white hover:text-white/70'
              }`}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Menu icon */}
              <svg
                className="block h-6 w-6"
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
        </div>
      </div>
    </nav>
  );
}