
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import Timeline from '@/components/program/Timeline';

const programItems = [
  {
    time: '17:00',
    title: 'Zahájení',
    description: 'Zahájení rozlučky s třídou 9.B.',
  },
  {
    time: '17:15',
    title: 'Prezentace třídy',
    description: 'Představení třídy a vzpomínání na společné zážitky.',
    highlight: true,
  },
  {
    time: '17:30',
    title: 'Poděkování učitelům',
    description: 'Krátké poděkování všem učitelům, kteří nás podporovali během naší školní docházky.',
  },
  {
    time: '18:00',
    title: 'Přestávka s občerstvením',
    description: 'Občerstvení',
  },
  {
    time: '18:45',
    title: 'Předání vysvědčení',
    description: 'Předání posledních vysvědčení na základní škole.',
    highlight: true,
  },
  {
    time: '19:10',
    title: 'Rozloučení',
    description: 'Přípitek a oficiální ukončení základní školní docházky.',
  },
];

const Program = () => {
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  
  useEffect(() => {
    setShowAnimation(true);
  }, []);

  return (
    <AppLayout>
      <div className={`container mx-auto px-4 py-8 opacity-0 ${showAnimation ? 'animate-fade-in' : ''}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"> 
            <span className="gradient-text">Program</span> rozlučky</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Přehled celého dne naší slavnostní rozlučky se základní školou.
          </p>
          
          <div className="glass p-6 rounded-2xl mb-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink to-mandarin flex items-center justify-center shrink-0 text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold dark:text-white">Pátek, 12. Března 2044</h2>
                <p className="text-gray-600 dark:text-gray-300">Rozlučka se koná v aule kulturáku</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple to-lightblue flex items-center justify-center shrink-0 text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold dark:text-white">Někde v Česku</h2>
                <p className="text-gray-600 dark:text-gray-300">Ulice Obecná 12345, Ostrov</p>
              </div>
            </div>
          </div>
          
          <Timeline items={programItems} />
          
          <div className="mt-16 text-center">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-3">Těšíme se na Vás!</p>
            <p className="text-gray-600 dark:text-gray-300">
              Pro více informací kontaktujte třídního učitele nebo zástupce třídy :D.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Program;
