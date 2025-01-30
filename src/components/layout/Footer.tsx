import { type ReactElement } from "react";
import { Link } from "react-router-dom";

const socialLinks = [
  {
    name: "YouTube",
    url: "https://www.youtube.com/@HitCraft_ai",
    icon: "/assets/images/footer/yb.webp",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61561797403318",
    icon: "/assets/images/footer/fb.webp",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/hitcraft.ai/",
    icon: "/assets/images/footer/in.webp",
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@hitcraftai",
    icon: "/assets/images/footer/tik.webp",
  },
  {
    name: "X",
    url: "https://x.com/Hitcraft_ai",
    icon: "/assets/images/footer/x.webp",
  },
];

const quickLinks = [
  { name: "Why HitCraft", path: "/why-hitcraft" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Terms of Use", path: "/terms" },
  { name: "Privacy Policy", path: "/privacy" },
];

export default function Footer(): ReactElement {
  return (
    <footer className="bg-[#252931] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <img
              src="/assets/images/footer/small_logo.webp"
              alt="HitCraft"
              className="h-8 mx-auto md:mx-0 mb-4"
            />
            <p className="text-gray-400 text-sm">
              Turn your musical ideas into standout songs with HitCraft - your partner in every stage of songwriting
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <img
                    src={social.icon}
                    alt={social.name}
                    className="w-full h-full object-contain"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} HitCraft. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}