import React from 'react';
import { ChevronRight } from 'lucide-react';

interface FeatureButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

const FeatureButton: React.FC<FeatureButtonProps> = ({ children, onClick, href }) => {
  const buttonContent = (
    <button
      className="bg-primary text-primary-foreground font-nunito px-6 py-2 text-lg font-medium rounded-2xl border-none tracking-wide flex items-center shadow-[inset_0_0_1.6em_-0.6em_hsl(var(--primary)_/_0.8)] overflow-hidden relative h-12 pr-14 cursor-pointer transition-all duration-300 hover:shadow-lg group"
      onClick={onClick}
    >
      {children}
      <div className="bg-primary-foreground ml-4 absolute flex items-center justify-center h-9 w-9 rounded-xl shadow-[0.1em_0.1em_0.6em_0.2em_hsl(var(--primary)_/_0.6)] right-1.5 transition-all duration-300 group-hover:w-[calc(100%-0.75rem)] group-active:scale-95">
        <ChevronRight className="w-5 h-5 text-primary transition-transform duration-300 group-hover:translate-x-0.5" />
      </div>
    </button>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
};

export default FeatureButton;