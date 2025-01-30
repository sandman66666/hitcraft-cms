import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function LandingDemo() {
  const navigate = useNavigate();
  const { descope: user } = useAuth();

  return (
    <div className="demo bg-gradient-to-r from-black to-gray-800 py-24">
      <div className="produce-song">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/82jg7BgQtYw"
              title="Meet The New HitCraft: The GPT for Music Creators"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-2xl shadow-2xl"
            ></iframe>
          </div>
          <div className="text-center pt-12">
            <button
              onClick={() => navigate(user ? "/chat" : "/login")}
              className="bg-gradient-to-br from-purple-500/20 to-red-500/20 hover:from-purple-500/30 hover:to-red-500/30 backdrop-blur-sm text-white px-16 py-5 rounded-xl text-xl font-medium transition-all duration-300 min-w-[280px]"
            >
              {user ? "Try it yourself!" : "Sign up to try it yourself!"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}