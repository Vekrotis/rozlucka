
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const bestMemories = [
  {
    text: 'Nikdy nezapomenu na školní výlet do Parlamentu, kdy jsme nestihli bus do Plzně a nakonec si užili den ve Varech.',
    name: 'Natalie Kheilová',
    image: 'zaci/naty.jpg',
  },
  {
    text: 'Nejlepší byla naše vánoční besídka, kde jsme zpívali koledy a Šímu odvedli kvůli mně.',
    name: 'David Vreštiak',
  },
  {
    text: 'Vzpomínám na sportovní den, kdy jsme vyhráli štafetu a slavili s celou třídou.',
    name: 'Aleš Břečka',
  },
  {
    text: 'Společné projekty v informatice mě naučily spolupracovat a pomáhat ostatním.',
    name: 'Laura Patočková',
  },
  {
    text: 'Dabeři ve škole byli cool.',
    name: 'Anna Vokatá',
  },
  {
    text: 'Nejvíc mě bavily hodiny výtvarné výchovy, kde jsme mohli tvořit podle vlastní fantazie.',
    name: 'Anna Vokatá',
  },
];

const teacherMessages = [
  {
    text: 'Bylo mi ctí učit vás. Přeji vám mnoho úspěchů do budoucna a věřím, že využijete všechny získané vědomosti a zkušenosti.',
    name: 'Ing. Nikola Matouškoová',
    desc: 'Učitelka matematiky v 6. - 8. třídě',
    image: '',
  },
  {
    text: 'Vaše třída byla vždy plná energie a nápadů. Děkuji za krásné roky.',
    name: 'Mgr. Martin Fous',
    desc: 'Ředitel a učitel matematiky',
  },
  {
    text: 'Přeji vám, ať si uchováte radost z objevování a nikdy se nebojíte ptát.',
    name: 'Mgr. Jiří Kollarov',
    desc: 'Učitel přírodopisu',
  },
  {
    text: 'Bylo radostí sledovat, jak rostete a zrajete. Hodně štěstí na další cestě!',
    name: 'Mgr. Frýdlová Michaela',
    desc: 'Učitelka angličtiny',
  },
];

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

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Přečtěte si, co nám největší radost přineslo během našich společných let.
            Podívejte se na vzkazy od spolužáků, učitelů i rodičů.
          </p>

          <div className="glass rounded-2xl p-6 mb-12">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Nejlepší vzpomínky</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bestMemories.map((item, idx) => (
                <div key={idx} className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-5 shadow-sm hover:shadow-md dark:hover:shadow-lg dark:hover:bg-gray-800/80 transition-all">
                  <p className="italic text-gray-600 dark:text-gray-300 mb-4">
                    "{item.text}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
                      {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    )}
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">{item.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-6 mb-12">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Vzkazy od učitelů</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teacherMessages.map((item, idx) => (
                <div key={idx} className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-5 shadow-sm hover:shadow-md dark:hover:shadow-lg dark:hover:bg-gray-800/80 transition-all">
                  <p className="italic text-gray-600 dark:text-gray-300 mb-4">
                    "{item.text}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
                      {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    )}
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">{item.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Popover>
              <PopoverTrigger className="bg-gradient-to-r from-pink via-peach to-mandarin text-white dark:from-pink/95 dark:via-peach/95 dark:to-mandarin/95 dark:text-white/95 px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all active:scale-95">
                Přidat vzpomínku
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-white/30 dark:border-gray-700/30">
                <p className="text-center text-gray-600 dark:text-gray-300 mb-3">Tato funkce bude brzy dostupná</p>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Vzpominky;
