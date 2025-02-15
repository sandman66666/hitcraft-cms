import React from 'react';

interface CTAButtonProps {
  text: string;
  onClick?: () => void;
  variant?: 'light' | 'dark';
}

export const CTAButton: React.FC<CTAButtonProps> = ({ text, onClick, variant = 'light' }) => {
  const baseClasses = "px-8 py-4 rounded-full text-lg font-[700] transition-all duration-300 hover:scale-105 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0px_6px_16px_rgba(0,0,0,0.3)] transform hover:-translate-y-0.5 flex items-center justify-center w-full sm:w-auto min-w-[200px]";
  
  const variantClasses = {
    light: "bg-white text-purple-700",
    dark: "bg-purple-700 text-white",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CTAButton;