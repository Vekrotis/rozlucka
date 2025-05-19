
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import GoogleMap from '@/components/map/GoogleMap';

const Info = () => {
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  
  useEffect(() => {
    setShowAnimation(true);
  }, []);

  return (
    <AppLayout>
      <div className={`container mx-auto px-4 py-8 opacity-0 ${showAnimation ? 'animate-fade-in' : ''}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text select-none">Informace</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 select-none">
            Vše, co potřebujete vědět o slavnostním rozloučení s 9.B.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="glass p-6 rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink to-mandarin flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <h2 className="text-xl font-semibold select-none dark:text-white">Místo konání</h2>
              </div>
              <p className="mb-2 select-none dark:text-white"><strong>Kulturní Dům....</strong></p>
              <p className="text-gray-600 dark:text-gray-300 mb-1 select-none">Ulice Obecná 12345</p>
              <p className="text-gray-600 dark:text-gray-300 mb-1 select-none">363 01 Ostrov</p>
              <p className="text-gray-600 dark:text-gray-300 select-none">Akce se koná v nějké aule</p>
            </div>
            
            <div className="glass p-6 rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple to-lightblue flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h2 className="text-xl font-semibold select-none dark:text-white">Datum a čas</h2>
              </div>
              <p className="mb-2 select-none dark:text-white"><strong>Pátek, 12. Březena 2044</strong></p>
              <p className="text-gray-600 dark:text-gray-300 mb-1 select-none">Začátek: 17:00</p>
              <p className="text-gray-600 dark:text-gray-300 select-none">Předpokládaný konec: 19:00</p>
            </div>
          </div>
          
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-5 select-none dark:text-white">Mapa</h2>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <GoogleMap height="400px" />
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-5 select-none dark:text-white">Často kladené otázky</h2>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-1">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="px-5 py-4 hover:bg-purple/5 dark:hover:bg-purple/10 rounded-xl select-none dark:text-white">
                    Je účast na rozlučce povinná?
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-4 select-none dark:text-gray-300">
                    Ne, účast není povinná, ale velmi si vážíme každého, kdo se zúčastní této události.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="px-5 py-4 hover:bg-purple/5 dark:hover:bg-purple/10 rounded-xl select-none dark:text-white">
                    Můžu v průběhu akce útéct?
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-4 select-none dark:text-gray-300">
                    Bohužel ne, akce bude probíhat v uzamčeném prostoru a není možné ji opustit během jejího průběhu. Po skončení akce si můžete samozřejmě odejít kdykoliv. 😘
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="px-5 py-4 hover:bg-purple/5 dark:hover:bg-purple/10 rounded-xl select-none dark:text-white">
                    Bude k dispozici občerstvení?
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-4 select-none dark:text-gray-300">
                    Nevíme, ale asi ano.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="px-5 py-4 hover:bg-purple/5 dark:hover:bg-purple/10 rounded-xl select-none dark:text-white">
                    Jak formálně se mám obléct?
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-4 select-none dark:text-gray-300">
                    Doporučujeme společenské oblečení odpovídající slavnostní příležitosti. Žáci 9.B budou oblečeni formálně :DD.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="px-5 py-4 hover:bg-purple/5 dark:hover:bg-purple/10 rounded-xl select-none dark:text-white">
                    Mohu přinést dárek pro učitele?
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-4 select-none dark:text-gray-300">
                    9.B si připraví dárky pro učitele. Pokud byste chtěli osobně někoho obdarovat, můžete tak samozřejmě učinit individuálně.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          
          <div className="glass p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 select-none dark:text-white">Kontakt</h2>
            <p className="mb-5 select-none dark:text-gray-300">
              V případě jakýchkoli dotazů nebo potřeby dalších informací nás neváhejte kontaktovat.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="font-semibold mb-2 select-none dark:text-white">Třídní učitelka</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-1 select-none">Mgr. Jaroslava Piherová</p>
                <p className="text-gray-600 dark:text-gray-300 mb-1 select-none">E-mail:</p>
                <p className="text-gray-600 dark:text-gray-300 select-none">Tel.:</p>
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold mb-2 select-none dark:text-white">Zástupce třídy</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-1 select-none">David Vreštiak, protože je na něj největší spoleh xDD</p>
                <p className="text-gray-600 dark:text-gray-300 mb-1 select-none">E-mail:</p>
                <p className="text-gray-600 dark:text-gray-300 select-none">Tel.:</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Info;
