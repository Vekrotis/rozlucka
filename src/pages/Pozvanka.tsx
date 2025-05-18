
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import GradientButton from '@/components/ui/GradientButton';
import ConfettiEffect from '@/components/effects/ConfettiEffect';
import { generateInvitationPDF } from '@/utils/pdf-generator';
import { useToast } from '@/hooks/use-toast';

const Pozvanka = () => {
  const [searchParams] = useSearchParams();
  const jmeno = searchParams.get('jmeno') || 'Vážený hoste';
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(true);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const invitationRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    setShowAnimation(true);
    
    // Disable confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleDownloadPDF = async () => {
    if (!invitationRef.current) return;
    
    setIsGeneratingPdf(true);
    try {
      const success = await generateInvitationPDF('invitation-content', `pozvanka-${jmeno.replace(/\s+/g, '-').toLowerCase()}.pdf`);
      
      if (success) {
        toast({
          title: "Pozvánka stažena",
          description: "PDF bylo úspěšně vygenerováno.",
          duration: 3000,
        });
      } else {
        toast({
          title: "Chyba",
          description: "Nepodařilo se vygenerovat PDF.",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Chyba",
        description: "Nastala chyba při generování PDF.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <AppLayout>
      <ConfettiEffect active={showConfetti} duration={10000} />
      
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4 relative py-8">
        <div
          id="invitation-content"
          ref={invitationRef}
          className={`max-w-2xl glass p-8 md:p-12 rounded-3xl opacity-0 ${showAnimation ? 'animate-fade-in' : ''} select-none`}
          style={{ animationDelay: '0.3s' }}
        >
          <h2 className="text-lg md:text-xl font-caveat text-gray-600 mb-1">Základní a Mateřská škola Ostrov</h2>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Osobní pozvánka pro
          </h1>
          
          <p className="text-2xl md:text-3xl font-bold my-6 py-2 px-4">
            {jmeno}
          </p>
          
          <p className="text-lg mb-8">
            Dovolujeme si Vás pozvat na slavnostní rozloučení třídy 9.B se základní školou, 
            které se uskuteční dne <strong>12. Března 2044</strong> v prostorách školy.
          </p>
          
          {/* Info icons for PDF export */}
          <div className="flex justify-center gap-8 my-6">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink to-mandarin flex items-center justify-center text-white mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <p className="text-sm font-medium">Kulturní Dům, Ostrov</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple to-lightblue flex items-center justify-center text-white mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <p className="text-sm font-medium">12. Března 2044, 17:00</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6 pdf-hide">
            <GradientButton to="/program" size="lg" variant="primary">
              Program dne
            </GradientButton>
            <GradientButton to="/info" size="lg" variant="accent">
              Informace
            </GradientButton>
          </div>
        </div>

        <div className={`mt-8 opacity-0 ${showAnimation ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.9s' }}>
          <GradientButton 
            onClick={handleDownloadPDF} 
            variant="secondary"
            disabled={isGeneratingPdf}
            className="whitespace-nowrap"
          >
            {isGeneratingPdf ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generuji PDF...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                Stáhnout PDF
              </>
            )}
          </GradientButton>
        </div>
      </section>
    </AppLayout>
  );
};

export default Pozvanka;
