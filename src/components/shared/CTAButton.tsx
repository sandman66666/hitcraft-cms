import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface CTAButtonProps {
  className?: string;
  onClick?: () => void;
  text?: string;
}

export const CTAButton = ({
  className = "",
  onClick,
  // @ts-ignore
  text,
}: CTAButtonProps) => {
  const navigate = useNavigate();
  const {
    descope: { isAuthenticated },
  } = useAuth();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    if (isAuthenticated) {
      window.location.href = import.meta.env.VITE_APP_URL;
    } else {
      navigate("/login");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`main-button-design gradient-purple-button 2xl:w-[290px] 
        hover:translate-y-[-3px] 
        shadow-md 
        hover:shadow-lg 
        transition-all duration-300 ease-in-out
        ${className}`}
    >
      LET'S GO!
    </button>
  );
};
