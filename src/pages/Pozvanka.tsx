
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import GradientButton from '@/components/ui/GradientButton';
import ConfettiEffect from '@/components/effects/ConfettiEffect';

const Pozvanka = () => {
  const [searchParams] = useSearchParams();
  const jmeno = searchParams.get('jmeno') || 'Vážený hoste';
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(true);
  
  useEffect(() => {
    setShowAnimation(true);
    
    // Disable confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppLayout>
      <ConfettiEffect active={showConfetti} duration={5000} />
      
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4 relative">
        <div 
          className={`max-w-2xl glass p-8 md:p-12 rounded-3xl opacity-0 ${showAnimation ? 'animate-fade-in' : ''}`}
          style={{ animationDelay: '0.3s' }}
        >
          <h2 className="text-lg md:text-xl font-caveat text-gray-600 mb-1">Základní škola Jihlava</h2>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Osobní pozvánka pro
          </h1>
          
          <p className="text-2xl md:text-3xl font-bold gradient-text my-6 py-2 px-4 border-2 border-dashed border-purple/30 rounded-xl">
            {jmeno}
          </p>
          
          <p className="text-lg mb-8">
            Dovolujeme si Vás pozvat na slavnostní rozloučení třídy 9.B se základní školou, 
            které se uskuteční dne <strong>30. června 2025</strong> v prostorách školy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <GradientButton to="/program" size="lg" variant="primary">
              Program dne
            </GradientButton>
            <GradientButton to="/info" size="lg" variant="accent">
              Informace
            </GradientButton>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Pozvanka;
