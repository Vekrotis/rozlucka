
import React from 'react';
import { Link } from 'react-router-dom';

interface GradientButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

const GradientButton: React.FC<GradientButtonProps> = ({ 
  children, 
  to, 
  onClick, 
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium text-center transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 border border-white/30 dark:border-white/10";
  
  const variantStyles = {
    primary: "bg-gradient-to-r from-pink via-peach to-mandarin text-white dark:from-pink/90 dark:via-peach/90 dark:to-mandarin/90 dark:text-white/90",
    secondary: "bg-gradient-to-r from-lightblue via-turquoise to-mint text-white dark:from-lightblue/90 dark:via-turquoise/90 dark:to-mint/90 dark:text-white/90", 
    accent: "bg-gradient-to-r from-purple to-lightblue text-white dark:from-purple/90 dark:via-purple/70 dark:to-lightblue/90 dark:text-white/90"
  };
  
  const sizeStyles = {
    sm: "text-xs py-2 px-6",
    md: "text-sm py-3 px-8",
    lg: "text-base py-4 px-10"
  };
  
  const combinedClassNames = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${className}`;
  
  if (to && !disabled) {
    return (
      <Link to={to} className={combinedClassNames}>
        {children}
      </Link>
    );
  }
  
  return (
    <button onClick={disabled ? undefined : onClick} className={combinedClassNames} disabled={disabled}>
      {children}
    </button>
  );
};

export default GradientButton;
