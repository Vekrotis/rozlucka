
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Info = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">Informace</h1>
          <p className="text-gray-600 mb-8">
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
                <h2 className="text-xl font-semibold">Místo konání</h2>
              </div>
              <p className="mb-2"><strong>Základní škola Jihlava</strong></p>
              <p className="text-gray-600 mb-1">Ulice Příkladová 123</p>
              <p className="text-gray-600 mb-1">586 01 Jihlava</p>
              <p className="text-gray-600">Akce se koná v aule školy (2. patro)</p>
            </div>
            
            <div className="glass p-6 rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple to-lightblue flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h2 className="text-xl font-semibold">Datum a čas</h2>
              </div>
              <p className="mb-2"><strong>Pátek, 28. června 2024</strong></p>
              <p className="text-gray-600 mb-1">Začátek: 13:00</p>
              <p className="text-gray-600">Předpokládaný konec: 18:30</p>
            </div>
          </div>
          
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-5">Mapa</h2>
            <div className="rounded-2xl overflow-hidden h-80 shadow-lg">
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">
                  Zde bude mapa místa konání
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-500 text-center">
              Pro navigaci klikněte na mapu nebo použijte adresu: Ulice Příkladová 123, Jihlava
            </p>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-5">Často kladené otázky</h2>
            <div className="bg-white/50 rounded-2xl p-1">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="px-5 py-4 hover:bg-purple/5 rounded-xl">
                    Je účast na rozlučce povinná?
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-4">
                    Ne, účast není povinná, ale velmi si vážíme každého, kdo se zúčastní této důležité životní události.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="px-5 py-4 hover:bg-purple/5 rounded-xl">
                    Kolik osob mohu vzít s sebou?
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-4">
                    Každý žák může pozvat až 4 osoby (rodiče, sourozence, prarodiče). Pokud byste chtěli přivést více hostů, kontaktujte prosím třídního učitele předem.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="px-5 py-4 hover:bg-purple/5 rounded-xl">
                    Bude k dispozici občerstvení?
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-4">
                    Ano, během přestávky bude připraveno drobné občerstvení a nápoje. Na konci akce proběhne slavnostní přípitek (pro děti nealkoholický).
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="px-5 py-4 hover:bg-purple/5 rounded-xl">
                    Jak formálně se mám obléct?
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-4">
                    Doporučujeme společenské oblečení odpovídající slavnostní příležitosti. Žáci 9.B budou oblečeni formálně.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="px-5 py-4 hover:bg-purple/5 rounded-xl">
                    Mohu přinést dárek pro učitele?
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-4">
                    Za třídní učitele a vedení školy bude připraven společný dárek. Pokud byste chtěli osobně někoho obdarovat, můžete tak samozřejmě učinit individuálně.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          
          <div className="glass p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Kontakt</h2>
            <p className="mb-5">
              V případě jakýchkoli dotazů nebo potřeby dalších informací nás neváhejte kontaktovat.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Třídní učitel</h3>
                <p className="text-gray-600 mb-1">Mgr. Jan Novák</p>
                <p className="text-gray-600 mb-1">E-mail: j.novak@zs-jihlava.cz</p>
                <p className="text-gray-600">Tel.: +420 777 123 456</p>
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Zástupce třídy</h3>
                <p className="text-gray-600 mb-1">Tereza Veselá</p>
                <p className="text-gray-600 mb-1">E-mail: terezaV@email.cz</p>
                <p className="text-gray-600">Tel.: +420 777 654 321</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Info;
