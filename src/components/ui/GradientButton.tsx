
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
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium text-center transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95";
  
  const variantStyles = {
    primary: "bg-gradient-to-r from-pink-500 via-rose-400 to-red-500 text-white hover:from-pink-600 hover:via-rose-500 hover:to-red-600",
    secondary: "bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-500 text-white hover:from-blue-600 hover:via-cyan-500 hover:to-teal-600", 
    accent: "bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white hover:from-purple-600 hover:via-indigo-600 hover:to-blue-600"
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
