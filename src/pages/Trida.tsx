
import React, { useState, useEffect, useRef } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { image } from 'html2canvas/dist/types/css/types/image';

const teacherProfiles = [
  // 1. Třídní učitelé (current and previous)
  { id: 1, name: 'Mgr. Jaroslava Piherová', subject: 'Třídní učitelka a učitelka Angličtiny' },
  { id: 2, name: 'Mgr. Kateřina Macurová', subject: 'Předchozí třídní učitelka', image: '' },
  { id: 3, name: 'Mgr. Hana Kůsová', subject: 'Třídní učitelka 1. stupně' },

  // 2. Ředitel a zástupci
  { id: 4, name: 'Mgr. Martin Fous', subject: 'Ředitel, učitel Matematiky a INF' },
  { id: 5, name: 'Mgr. Václav Hruška', subject: 'Zástupce ředitele' },
  { id: 6, name: 'Mgr. Věra Kučerová', subject: 'Zástupkyně ředitele a učitelka Ruštiny' },

  // 3. Asistenti
  { id: 7, name: 'Viktorie Bendová', subject: 'Asistentka' },
  { id: 8, name: 'Kateřina Jandová', subject: 'Předchozí asistentka' },

  // 4. Učitelé hlavních předmětů
  { id: 9, name: 'Mgr. Lenka Buchtová', subject: 'Učitelka Českého jazyka' },
  { id: 10, name: 'Ing. Nikola Matoušková', subject: 'Učitelka Matematiky a Přírodopisu' },
  { id: 11, name: 'Mgr. Roman Chocholáček', subject: 'Učitel Informatiky' },
  { id: 12, name: 'Mgr. Ester Štefková', subject: 'Učitelka Informatiky' },
  { id: 13, name: 'Arpád Kökeny', subject: 'Učitel informatiky' },
  { id: 14, name: 'Mgr. Zdeněk Kunc', subject: 'Učitel Chemie' },
  { id: 15, name: 'Mgr. Martin Choutka', subject: 'Učitel Fyziky' },
  { id: 16, name: 'Mgr. Jiří Kollarov', subject: 'Učitel Přírodopisu a HV' },
  { id: 17, name: 'Mgr. Danuše Levá', subject: 'Učitelka Přírodovědy' },
  { id: 18, name: 'Mgr. Lenka Machalová', subject: 'Učitelka Vlastivědy' },
  { id: 19, name: 'Mgr. Jiří Hájek', subject: 'Učitel Dějepisu' },
  { id: 20, name: 'Mgr. Anna Veselá', subject: '' },

  // 5. Učitelé jazyků
  { id: 21, name: 'Mgr. Michaela Frýdlová', subject: 'Učitelka Angličtiny a Němčiny' },
  { id: 22, name: 'Mgr. Pavel Vítek', subject: 'Učitel Angličtiny' },

  // 6. Učitelé tělesné výchovy
  { id: 23, name: 'Mgr. Tomáš Kulhavý', subject: 'Učitel Tělesné výchovy' },
  { id: 24, name: 'Mgr. Jiří Mrnka', subject: 'Učitel Tělesné výchovy' },
  { id: 25, name: 'Mgr. Martin Matoušek', subject: 'Učitel Tělesné výchovy' },
  { id: 26, name: 'Mgr. Michal Sütto', subject: 'Učitel Tělesné výchovy' },

  // 7. Ostatní učitelé
  { id: 27, name: 'Mgr. Dana Klauková', subject: 'Učitelka Hudební výchovy' },
  { id: 28, name: 'Mgr. Ivana Koutná', subject: 'Učitelka Občanské výchovy' },
  { id: 29, name: 'Mgr. Kateřina Rücková', subject: '' },
  { id: 30, name: 'Mgr. Milena Topinková', subject: 'Učitelka Výtvarné výchovy' },
  { id: 31, name: 'Mgr. Linda Takieddinová', subject: '' },
  { id: 32, name: 'Mgr. Hana Veselá', subject: 'Učitelka Zeměpisu a Němčiny' },
  { id: 33, name: 'Mgr. Ivana Malcátová', subject: '' },
  { id: 34, name: 'Mgr. Radek Pícha', subject: 'Výchovný poradce a učitel' },
  { id: 35, name: 'Mgr. Lada Bláhová', subject: '' },
  { id: 36, name: 'Mgr. Ivana Bortlíková', subject: 'Učitelka Prvouky' },
];

const studentProfiles = [
  { id: 1, name: 'Matouš Appeltauer', image: 'zaci/matous.jpg' },
  { id: 2, name: 'Jakub Bečka', image: 'zaci/kuba.jpg' },
  { id: 3, name: 'Yassine Ben Salem', image: 'zaci/yassin.jpg' },
  { id: 4, name: 'Lukas Benda', image: 'zaci/lukas.png' },
  { id: 5, name: 'Ondřej Beran', image: 'zaci/ondra.jpeg' },
  { id: 6, name: 'Aleš Břečka' },
  { id: 7, name: 'Jan Čepelák' },
  { id: 8, name: 'Adriana Demeterová' },
  { id: 9, name: 'Hana Dvořáková', image: 'zaci/hanka.jpg' },
  { id: 10, name: 'Ema Horčičková', image: 'zaci/emi4.jpg' },
  { id: 11, name: 'Sofia Javůrková', image: 'zaci/sofi.jpeg' },
  { id: 12, name: 'Natalie Kheilová', image: 'zaci/naty1.jpg' },
  { id: 13, name: 'Zuzana Kocifajová', image: 'zaci/zuzka2.jpg' },
  { id: 14, name: 'Rostislav Kotek', image: 'zaci/rosta.jpg' },
  { id: 15, name: 'Eliška Kukučíková' },
  { id: 16, name: 'Daniel Novotný', image: 'zaci/dan.jpeg' },
  { id: 17, name: 'Laura Patočková' },
  { id: 18, name: 'Matěj Rezák', image: 'zaci/matej.JPG' },
  { id: 19, name: 'David Šíma', image: 'zaci/sima.jpg',  },
  { id: 20, name: 'Tereza Šnajdrová', image: 'zaci/terka2.jpg' },
  { id: 21, name: 'Pavel Šneberger', image: 'zaci/paja.jpg' },
  { id: 22, name: 'Klára Štefková' },
  { id: 23, name: 'Anna Vokatá', image: 'zaci/anna.jpeg' },
  { id: 24, name: 'David Vreštiak', image: 'zaci/davidv.png' },
];

interface Profile {
  id: number;
  name: string;
  subject?: string;
  image?: string;
}

const Trida = () => {
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<{
    teachers: Profile[];
    students: Profile[];
    bestMatchRef: React.RefObject<HTMLDivElement> | null;
  }>({
    teachers: teacherProfiles,
    students: studentProfiles,
    bestMatchRef: null
  });

  const teacherRefs = useRef<Map<number, React.RefObject<HTMLDivElement>>>(
    new Map(teacherProfiles.map(teacher => [teacher.id, React.createRef<HTMLDivElement>()])
  ));
  
  const studentRefs = useRef<Map<number, React.RefObject<HTMLDivElement>>>(
    new Map(studentProfiles.map(student => [student.id, React.createRef<HTMLDivElement>()])
  ));

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults({
        teachers: teacherProfiles,
        students: studentProfiles,
        bestMatchRef: null
      });
      return;
    }

    const normalizedQuery = searchQuery.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Search logic for teachers
    const filteredTeachers = teacherProfiles.filter(teacher => {
      const normalizedName = teacher.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const normalizedSubject = teacher.subject?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "";
      return normalizedName.includes(normalizedQuery) || normalizedSubject.includes(normalizedQuery);
    });
    
    // Search logic for students
    const filteredStudents = studentProfiles.filter(student => {
      const normalizedName = student.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return normalizedName.includes(normalizedQuery);
    });
    
    // Find best match (prioritize exact matches in name)
    let bestMatch: { type: 'teacher' | 'student', id: number } | null = null;
    
    // First check for exact teacher name matches
    const exactTeacherMatch = filteredTeachers.find(teacher => 
      teacher.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === normalizedQuery
    );
    
    if (exactTeacherMatch) {
      bestMatch = { type: 'teacher', id: exactTeacherMatch.id };
    } else {
      // Then check for exact student name matches
      const exactStudentMatch = filteredStudents.find(student => 
        student.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === normalizedQuery
      );
      
      if (exactStudentMatch) {
        bestMatch = { type: 'student', id: exactStudentMatch.id };
      } else if (filteredTeachers.length > 0) {
        // If no exact matches, take the first teacher
        bestMatch = { type: 'teacher', id: filteredTeachers[0].id };
      } else if (filteredStudents.length > 0) {
        // Or the first student if no teachers
        bestMatch = { type: 'student', id: filteredStudents[0].id };
      }
    }
    
    // Get the ref for the best match
    let bestMatchRef = null;
    if (bestMatch) {
      if (bestMatch.type === 'teacher') {
        bestMatchRef = teacherRefs.current.get(bestMatch.id) || null;
      } else {
        bestMatchRef = studentRefs.current.get(bestMatch.id) || null;
      }
      
      // Scroll to best match
      if (bestMatchRef?.current) {
        setTimeout(() => {
          bestMatchRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
    
    setSearchResults({
      teachers: filteredTeachers,
      students: filteredStudents,
      bestMatchRef
    });
  }, [searchQuery]);

  // Highlight text that matches the search query
  const highlightText = (text: string) => {
    if (!searchQuery.trim()) return text;
    
    const normalizedText = text;
    const normalizedQuery = searchQuery;
    
    // Simple highlight for now - case insensitive
    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = normalizedText.split(regex);
    
    return (
      <>
        {parts.map((part, i) => 
          regex.test(part) ? <span key={i} className="highlight">{part}</span> : part
        )}
      </>
    );
  };

  return (
    <AppLayout>
      <section className={`min-h-[90vh] px-4 py-24 md:py-32 opacity-0 ${showAnimation ? 'animate-fade-in' : ''}`}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Naše <span className="gradient-text">třída</span>
          </h1>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Seznamte se s naší třídou 9.B, našimi učiteli a všemi, kdo nás během těchto devíti let
            provázeli a podporovali.
          </p>
            <div className="relative mb-8">
            <Input
              type="text"
              placeholder="Hledat učitele, předměty nebo žáky..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 search-field bg-white/20 dark:bg-gray-800/70 backdrop-blur"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-4 w-4" />
            </div>

          <div className="glass rounded-2xl p-6 hover:shadow-lg transition-all mb-12">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Naši učitelé</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {searchResults.teachers.length > 0 ? (
                searchResults.teachers.map((teacher) => (
                  <div 
                    key={teacher.id} 
                    ref={teacherRefs.current.get(teacher.id) || null}
                    className="text-center hover:-translate-y-1 transition-transform"
                  >
                    <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto mb-2 flex items-center justify-center overflow-hidden">
                      {teacher.image ? (
                        <img
                          src={teacher.image}
                          alt={teacher.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <svg className="w-10 h-10 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                      )}
                    </div>
                    <p className="font-medium dark:text-gray-200">{highlightText(teacher.name)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{highlightText(teacher.subject || '')}</p>
                  </div>
                ))
              ) : (
                <p className="col-span-3 text-center text-gray-500 dark:text-gray-400 py-4">Žádní učitelé nenalezeni</p>
              )}
            </div>
          </div>

          <div className="glass rounded-2xl p-6 hover:shadow-lg transition-all mb-12">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Naši žáci</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {searchResults.students.length > 0 ? (
                searchResults.students.map((student) => (
                  <div 
                    key={student.id} 
                    ref={studentRefs.current.get(student.id) || null}
                    className="text-center hover:-translate-y-1 transition-transform"
                  >
                    <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto mb-2 flex items-center justify-center overflow-hidden">
                      {student.image ? (
                        <img
                          src={student.image}
                          alt={student.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <svg className="w-10 h-10 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                      )}
                    </div>
                    <p className="font-medium dark:text-gray-200">{highlightText(student.name)}</p>
                  </div>
                ))
              ) : (
                <p className="col-span-5 text-center text-gray-500 dark:text-gray-400 py-4">Žádní žáci nenalezeni</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Trida;
