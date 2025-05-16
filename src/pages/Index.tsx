
import React, { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import GradientButton from '@/components/ui/GradientButton';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [quote] = useState<string>("„Není důležité, jak dlouho žijeme, ale jak. Není důležité, kam jdeme, ale jak se tam dostaneme. Není důležité, co máme, ale co děláme s tím, co máme."");
  const [author] = useState<string>("— Jan Werich");
  
  useEffect(() => {
    setShowAnimation(true);
    
    // Check if this is the first visit
    const firstVisit = localStorage.getItem('firstVisit') !== 'false';
    if (firstVisit) {
      // Welcome toast for first visit
      setTimeout(() => {
        toast({
          title: "Vítejte!",
          description: "Vítáme vás na vzpomínkové stránce třídy 9.B",
          duration: 5000,
        });
        localStorage.setItem('firstVisit', 'false');
      }, 1000);
    }
  }, [toast]);
  
  return (
    <AppLayout>
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4 relative">
        <div 
          className={`opacity-0 transform ${showAnimation ? 'animate-fade-in' : ''}`}
          style={{ animationDelay: '0.2s' }}
        >
          <h2 className="text-lg md:text-xl font-caveat text-gray-600 mb-1">Základní škola Jihlava</h2>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
            Rozloučení se třídou <span className="gradient-text">9.B</span>
          </h1>
        </div>
        
        <div 
          className={`max-w-2xl my-8 opacity-0 ${showAnimation ? 'animate-fade-in' : ''}`}
          style={{ animationDelay: '0.6s' }}
        >
          <blockquote className="text-lg md:text-xl text-gray-700 italic font-light">
            {quote}
            <footer className="mt-2 text-right text-sm font-medium">{author}</footer>
          </blockquote>
        </div>
        
        <div 
          className={`flex flex-wrap gap-4 justify-center mt-6 opacity-0 ${showAnimation ? 'animate-fade-in' : ''}`}
          style={{ animationDelay: '0.9s' }}
        >
          <GradientButton to="/program" size="lg" variant="primary">
            Program dne
          </GradientButton>
          <GradientButton to="/galerie" size="lg" variant="accent">
            Galerie vzpomínek
          </GradientButton>
        </div>
        
        <div 
          className={`absolute bottom-12 left-0 right-0 flex justify-center opacity-0 ${showAnimation ? 'animate-fade-in' : ''}`}
          style={{ animationDelay: '1.2s' }}
        >
          <svg 
            className="w-6 h-6 animate-bounce text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>
      
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Naše společná cesta</h2>
          <p className="mb-4 text-gray-700">
            Devět let společného studia, radostí i starostí. Zažili jsme toho hodně - od prvních krůčků 
            ve škole až po přípravu na životní zkoušky. Tato stránka je naším poděkováním všem, 
            kdo byli součástí naší cesty.
          </p>
          <p className="mb-6 text-gray-700">
            Projděte si naše společné vzpomínky, prohlédněte si fotografie z celé naší školní docházky 
            a připomeňte si, co všechno jsme společně zažili.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="glass rounded-2xl p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-pink to-peach flex items-center justify-center text-white mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Program rozlučky</h3>
              <p className="text-gray-600 mb-4">
                Podívejte se, co jsme pro vás připravili. Přehledný harmonogram celého dne 
                s popisem jednotlivých aktivit.
              </p>
              <GradientButton to="/program" size="sm">
                Zobrazit program
              </GradientButton>
            </div>
            
            <div className="glass rounded-2xl p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple to-lightblue flex items-center justify-center text-white mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Naše třída</h3>
              <p className="text-gray-600 mb-4">
                Seznamte se s naší třídou, našimi učiteli a všemi, kdo nás během těchto let 
                provázeli a podporovali.
              </p>
              <GradientButton to="/trida" variant="accent" size="sm">
                Poznat naši třídu
              </GradientButton>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Index;
