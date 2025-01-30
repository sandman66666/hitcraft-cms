import { Link } from "react-router-dom";

interface MenuOverlayProps {
  isOpen: boolean;
  menuState: "closed" | "entering" | "open" | "exiting";
  onClose: () => void;
  isPricingPage?: boolean;
  isWhitelisted?: boolean;
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

export default function MenuOverlay({
  isOpen,
  menuState,
  onClose,
  isPricingPage = false,
  isWhitelisted = false,
  isLoggedIn = false,
  onLogout,
}: MenuOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="menu-overlay" onClick={onClose}>
      <div
        className={`menu-container ${
          menuState === "entering" ? "menu-enter" : ""
        } ${menuState === "exiting" ? "menu-exit" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Link to="/">Home</Link>
        {!isPricingPage ? (
          <Link to="/pricing">Pricing</Link>
        ) : (
          <Link to="/">Back to Home</Link>
        )}
        {isWhitelisted && (
          <Link to="/chat">Product</Link>
        )}
        <Link to="/why-hitcraft">Why HitCraft</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
        {isLoggedIn && onLogout && (
          <Link to="/" onClick={onLogout}>
            Logout
          </Link>
        )}
      </div>
    </div>
  );
}