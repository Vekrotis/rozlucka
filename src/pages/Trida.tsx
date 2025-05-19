import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { image } from 'html2canvas/dist/types/css/types/image';
import { sub } from 'date-fns';

const teacherProfiles = [
  { id: 0, name: 'Mgr. Martin Fous', subject: 'Ředitel, učitel Matematiky a INF' },
  { id: 1, name: 'Mgr. Jaroslava Piherová', subject: 'Třídní učitelka a učitelka Angličtiny', image: 'ucitele/Untitled11.png' },
  { id: 2, name: 'Mgr. Kateřina Macurová', subject: 'Předchozí třídní učitelka', image: '/profiles/teacher2.jpg' },
  { id: 3, name: 'Mgr. Zapomnel Jmeno', subject: 'Třídní učitelka 1. stupně' },
  { id: 4, name: 'Viktorie Bendová', subject: 'Asistentka' },
  { id: 5, name: 'Jaroslava Jandová', subject: 'Předchozí asistentka' },
  { id: 6, name: 'Mgr. Lenka Buchtová', subject: 'Učitelka Českého jazyka' },
  { id: 7, name: 'Mgr. Michaela Frýdlová', subject: 'Učitelka Angličtiny a Němčiny' },
  { id: 8, name: 'Mgr. Pavel Vítek', subject: 'Učitel Angličtiny' },
  { id: 9, name: 'Mgr. Hana Veselá', subject: 'Učitelka Zeměpisu a Němčiny' },
  { id: 11, name: 'Mgr. Martin Choutka', subject: 'Učitel Fyziky' },
  { id: 12, name: 'Mgr. Zdeněk Kunc', subject: 'Učitel Chemie' },
  { id: 13, name: 'Mgr. Petr Černý', subject: 'Učitel Přírodopisu' },
  { id: 14, name: 'Mgr. Karel Svoboda', subject: 'Učitel Dějepisu' },
  { id: 15, name: 'Mgr. Eva Novotná', subject: 'Učitelka Přírodopisu' },
  { id: 16, name: 'a tak dále', subject: 'xd' },
];

const studentProfiles = [
  { id: 1, name: 'Matouš Appeltauer', image: 'zaci/Untitled6.png' },
  { id: 2, name: 'Jakub Bečka' },
  { id: 3, name: 'Yassine Ben Salem' },
  { id: 4, name: 'Lukas Benda' },
  { id: 5, name: 'Ondřej Beran' },
  { id: 6, name: 'Aleš Břečka' },
  { id: 7, name: 'Jan Čepelák' },
  { id: 8, name: 'Adriana Demeterová' },
  { id: 9, name: 'Hana Dvořáková' },
  { id: 10, name: 'Ema Horčičková' },
  { id: 11, name: 'Sofia Javůrková' },
  { id: 12, name: 'Natalie Kheilová' },
  { id: 13, name: 'Zuzana Kocifajová' },
  { id: 14, name: 'Rostislav Kotek' },
  { id: 15, name: 'Eliška Kukučíková' },
  { id: 16, name: 'Daniel Novotný' },
  { id: 17, name: 'Laura Patočková' },
  { id: 18, name: 'Matěj Rezák' },
  { id: 19, name: 'David Šíma' },
  { id: 20, name: 'Tereza Šnajdrová' },
  { id: 21, name: 'Pavel Šneberger' },
  { id: 22, name: 'Klára Štefková' },
  { id: 23, name: 'Anna Vokatá' },
  { id: 24, name: 'David Vreštiak' },
];

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
              {teacherProfiles.map((teacher) => (
                <div key={teacher.id} className="text-center hover:-translate-y-1 transition-transform">
                  <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-2 flex items-center justify-center overflow-hidden">
                    {teacher.image ? (
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    )}
                  </div>
                  <p className="font-medium">{teacher.name}</p>
                  <p className="text-sm text-gray-600">{teacher.subject}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-6 hover:shadow-lg transition-all mb-12">
            <h2 className="text-xl font-semibold mb-4">Naši žáci</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {studentProfiles.map((student) => (
                <div key={student.id} className="text-center hover:-translate-y-1 transition-transform">
                  <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-2 flex items-center justify-center overflow-hidden">
                    {student.image ? (
                      <img
                        src={student.image}
                        alt={student.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    )}
                  </div>
                  <p className="font-medium">{student.name}</p>
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
