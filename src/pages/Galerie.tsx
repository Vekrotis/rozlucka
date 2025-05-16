
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';

const Galerie = () => {
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  
  useEffect(() => {
    setShowAnimation(true);
  }, []);

  return (
    <AppLayout>
      <section className={`min-h-[90vh] px-4 py-24 md:py-32 opacity-0 ${showAnimation ? 'animate-fade-in' : ''}`}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Galerie</span> vzpomínek
          </h1>
          
          <p className="text-lg text-gray-700 mb-8">
            Projděte si fotografie a vzpomínky na naši společnou cestu základní školou. 
            Zde najdete nejdůležitější momenty z našich devíti let.
          </p>
          
          <div className="glass rounded-2xl p-6 mb-10">
            <h2 className="text-xl font-semibold mb-4">Filtry</h2>
            <div className="flex flex-wrap gap-3 mb-4">
              <button className="px-4 py-2 bg-purple text-white rounded-full text-sm">Všechny</button>
              <button className="px-4 py-2 bg-white/70 hover:bg-purple/10 rounded-full text-sm transition-colors">1. třída</button>
              <button className="px-4 py-2 bg-white/70 hover:bg-purple/10 rounded-full text-sm transition-colors">Výlety</button>
              <button className="px-4 py-2 bg-white/70 hover:bg-purple/10 rounded-full text-sm transition-colors">Škola v přírodě</button>
              <button className="px-4 py-2 bg-white/70 hover:bg-purple/10 rounded-full text-sm transition-colors">9. třída</button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div 
                key={item} 
                className="aspect-square rounded-xl overflow-hidden glass hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
              >
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-500 italic">
              Více fotografií bude přidáno brzy...
            </p>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Galerie;
