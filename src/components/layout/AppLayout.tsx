
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="blob-effect"></div>
      <div className="blob-effect" style={{ left: '60vw', animationDelay: '-5s' }}></div>
      
      {/* Desktop header - hidden on mobile */}
      {!isMobile && (
        <header 
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? 'glass py-3' : 'bg-transparent py-5'
          }`}
        >
          <div className="container mx-auto flex items-center justify-between">
            <Link 
              to="/" 
              className="text-2xl font-bold gradient-text"
            >
              9.B
            </Link>
            <nav className="flex gap-8">
              <Link 
                to="/program" 
                className={`font-medium transition hover:text-purple ${isActive('/program') ? 'text-purple' : ''}`}
              >
                Program
              </Link>
              <Link 
                to="/trida" 
                className={`font-medium transition hover:text-purple ${isActive('/trida') ? 'text-purple' : ''}`}
              >
                Třída
              </Link>
              <Link 
                to="/galerie" 
                className={`font-medium transition hover:text-purple ${isActive('/galerie') ? 'text-purple' : ''}`}
              >
                Galerie
              </Link>
              <Link 
                to="/vzpominky" 
                className={`font-medium transition hover:text-purple ${isActive('/vzpominky') ? 'text-purple' : ''}`}
              >
                Vzpomínky
              </Link>
              <Link 
                to="/info" 
                className={`font-medium transition hover:text-purple ${isActive('/info') ? 'text-purple' : ''}`}
              >
                Info
              </Link>
            </nav>
          </div>
        </header>
      )}
      
      {/* Main content */}
      <main className="flex-grow pt-24 pb-28 md:pb-16">
        {children}
      </main>
      
      {/* Mobile bottom navigation */}
      {isMobile && <BottomNav />}
      
      <footer className="p-4 text-center text-sm text-gray-500 font-caveat">
        S láskou vytvořeno třídou 9.B 💜
      </footer>
    </div>
  );
};

export default AppLayout;
