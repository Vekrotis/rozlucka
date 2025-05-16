
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';

const Trida = () => {
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  
  useEffect(() => {
    setShowAnimation(true);
  }, []);

  return (
    <AppLayout>
      <section className={`min-h-[90vh] px-4 py-24 md:py-32 opacity-0 ${showAnimation ? 'animate-fade-in' : ''}`}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Naše <span className="gradient-text">třída</span>
          </h1>
          
          <p className="text-lg text-gray-700 mb-8">
            Seznamte se s naší třídou 9.B, našimi učiteli a všemi, kdo nás během těchto devíti let
            provázeli a podporovali.
          </p>
          
          <div className="glass rounded-2xl p-6 hover:shadow-lg transition-all mb-12">
            <h2 className="text-xl font-semibold mb-4">Naši učitelé</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-2 flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                  <p className="font-medium">Jméno učitele</p>
                  <p className="text-sm text-gray-600">Předmět</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass rounded-2xl p-6 hover:shadow-lg transition-all mb-12">
            <h2 className="text-xl font-semibold mb-4">Naši žáci</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => (
                <div key={item} className="text-center hover:-translate-y-1 transition-transform">
                  <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-2 flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                  <p className="font-medium">Jméno žáka</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Trida;
