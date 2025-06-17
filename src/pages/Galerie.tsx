
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';

const Galerie = () => {
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  
  useEffect(() => {
    const timeout = requestAnimationFrame(() => {
      setShowAnimation(true);
    });
    
    return () => cancelAnimationFrame(timeout);
  }, []);

  return (
    <AppLayout>
      <section className={`min-h-[90vh] px-4 py-24 md:py-32 opacity-0 ${showAnimation ? 'animate-fade-in' : ''}`}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 select-none">
            <span className="gradient-text">Galerie</span> vzpomínek
          </h1>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Projděte si fotografie a vzpomínky na naši společnou cestu základní školou. 
            Zde najdete nejdůležitější momenty z našich devíti let.
          </p>
          
          <div className="glass rounded-2xl p-12 mb-10 bg-white/70 dark:bg-gray-900/60 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-yellow-400 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-white">
              Galerie bude dostupná od 28. 6. 2025
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Těšte se na vzpomínky z celých devíti let naší společné cesty základní školou.
            </p>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Galerie;
