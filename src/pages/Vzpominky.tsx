
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Vzpominky = () => {
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  
  useEffect(() => {
    setShowAnimation(true);
  }, []);

  return (
    <AppLayout>
      <section className={`min-h-[90vh] px-4 py-24 md:py-32 opacity-0 ${showAnimation ? 'animate-fade-in' : ''}`}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Vzpomínky</span> a vzkazy
          </h1>
          
          <p className="text-lg text-gray-700 mb-8">
            Přečtěte si, co nám největší radost přineslo během našich společných let. 
            Podívejte se na vzkazy od spolužáků, učitelů i rodičů.
          </p>
          
          <div className="glass rounded-2xl p-6 mb-12">
            <h2 className="text-xl font-semibold mb-4">Nejlepší vzpomínky</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-white/60 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <p className="italic text-gray-600 mb-4">
                    "Nikdy nezapomenu na školní výlet do Prahy, kdy jsme se ztratili v metru a nakonec 
                    našli cestu zpět díky náhodné turistce."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Jméno žáka</p>
                      <p className="text-xs text-gray-500">5. třída</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass rounded-2xl p-6 mb-12">
            <h2 className="text-xl font-semibold mb-4">Vzkazy od učitelů</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white/60 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <p className="italic text-gray-600 mb-4">
                    "Bylo mi ctí být součástí vaší vzdělávací cesty. Přeji vám mnoho úspěchů do budoucna 
                    a věřím, že využijete všechny získané vědomosti a zkušenosti."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Učitel</p>
                      <p className="text-xs text-gray-500">Třídní učitel</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Popover>
              <PopoverTrigger className="bg-gradient-to-r from-pink via-peach to-mandarin text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all active:scale-95">
                Přidat vzpomínku
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/30">
                <p className="text-center text-gray-600 mb-3">Tato funkce bude brzy dostupná</p>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Vzpominky;
