
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
    }, 5000);
    
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
      <ConfettiEffect active={showConfetti} duration={5000} />
      
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4 relative py-8">
        <div
          id="invitation-content"
          ref={invitationRef}
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

        <div className={`mt-8 opacity-0 ${showAnimation ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.9s' }}>
          <GradientButton 
            onClick={handleDownloadPDF} 
            variant="secondary"
            disabled={isGeneratingPdf}
            className="whitespace-nowrap flex-nowrap"
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
                <span>Stáhnout PDF</span>
              </>
            )}
          </GradientButton>
        </div>
      </section>
    </AppLayout>
  );
};

export default Pozvanka;
