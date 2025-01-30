import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider as AppAuthProvider } from "./contexts/AuthContext";
import Login from "./components/auth/Login";
import Landing from "./components/landing/Landing";
import Pricing from "./components/pricing/Pricing";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { AuthProvider } from "@descope/react-sdk";
import OAuthCallback from "./components/auth/oauth/OAuthCallback";
import AboutUs from "./components/about-us/AboutUs";
import ContactUs from "./components/contact-us/ContactUs";
import WhyHitCraft from "./components/why-hitcraft/WhyHitCraft";
import ScrollToTop from "./components/shared/ScrollToTop";
import TermsOfUse from "./components/terms-of-use";

const { VITE_DESCOPE_PROJECT_ID } = import.meta.env;
const { VITE_DESCOPE_AUTH_URL } = import.meta.env;

export default function App() {
  return (
    <AuthProvider
      projectId={VITE_DESCOPE_PROJECT_ID}
      baseUrl={VITE_DESCOPE_AUTH_URL}
    >
      <Router>
        <ScrollToTop />
        <AppAuthProvider>
          <div className="overflow-hidden">
            <div className="bg-transparent flex flex-col">
              <Navbar />
              <main>
                <Routes>
                <Route path="*" element={<Navigate to={"/"} />} />
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/articles/terms-of-use"
                  element={<TermsOfUse />}
                />
                <Route path="/oauth/callback" element={<OAuthCallback />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/why-hitcraft" element={<WhyHitCraft />} />
                <Route path="/pricing" element={<Pricing />} />
                </Routes>
              </main>
              <Footer />
            </div>
            <Toaster position="top-center" />
          </div>
        </AppAuthProvider>
      </Router>
    </AuthProvider>
  );
}
