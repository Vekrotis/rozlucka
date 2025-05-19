
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Toggle } from '@/components/ui/toggle';

interface ThemeToggleProps {
  className?: string;
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = '',
  variant = 'default',
  size = 'default'
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Toggle
      variant={variant}
      size={size}
      pressed={theme === 'dark'}
      onPressedChange={toggleTheme}
      aria-label="Toggle dark mode"
      className={`transition-all ${className}`}
    >
      {theme === 'dark' ? (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Toggle>
  );
};

export default ThemeToggle;
