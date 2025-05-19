
import React, { useState, useEffect, useRef } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

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
              className="pl-10 pr-4 py-2"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-4 w-4" />
          </div>

          <div className="glass rounded-2xl p-6 hover:shadow-lg transition-all mb-12">
            <h2 className="text-xl font-semibold mb-4">Naši učitelé</h2>
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
                    <p className="font-medium">{highlightText(teacher.name)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{highlightText(teacher.subject || '')}</p>
                  </div>
                ))
              ) : (
                <p className="col-span-3 text-center text-gray-500 dark:text-gray-400 py-4">Žádní učitelé nenalezeni</p>
              )}
            </div>
          </div>

          <div className="glass rounded-2xl p-6 hover:shadow-lg transition-all mb-12">
            <h2 className="text-xl font-semibold mb-4">Naši žáci</h2>
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
                    <p className="font-medium">{highlightText(student.name)}</p>
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
