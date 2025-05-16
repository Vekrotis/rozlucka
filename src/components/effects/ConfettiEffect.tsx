
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

interface ConfettiEffectProps {
  active?: boolean;
  duration?: number;
  onComplete?: () => void;
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ 
  active = false, 
  duration = 5000,
  onComplete
}) => {
  const [showConfetti, setShowConfetti] = useState(active);
  const [windowSize, setWindowSize] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 0, 
    height: typeof window !== 'undefined' ? window.innerHeight : 0 
  });

  useEffect(() => {
    setShowConfetti(active);
    
    if (active && duration > 0) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
        if (onComplete) onComplete();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [active, duration, onComplete]);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!showConfetti) return null;
  
  return (
    <Confetti
      width={windowSize.width}
      height={windowSize.height}
      numberOfPieces={200}
      recycle={false}
      colors={['#FFD6DE', '#FF9D7D', '#FFB347', '#FFE169', '#D9B8FF', '#B8E1FF', '#BDFFC6']}
    />
  );
};

export default ConfettiEffect;
