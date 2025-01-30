import React from 'react';

type IconType = 'check' | 'x' | 'exclamation';

interface IconIndicatorProps {
  type: IconType;
  className?: string;
}

export const IconIndicator: React.FC<IconIndicatorProps> = ({ type, className = "" }) => {
  const getIcon = () => {
    switch (type) {
      case 'check':
        return (
          <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'x':
        return (
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'exclamation':
        return (
          <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
    }
  };

  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      {getIcon()}
    </span>
  );
};