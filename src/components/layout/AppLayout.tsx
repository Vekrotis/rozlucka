import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAutoScroll } from '@/hooks/use-auto-scroll';
interface AppLayoutProps {
  children: React.ReactNode;
}
const AppLayout: React.FC<AppLayoutProps> = ({
  children
}) => {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  // Use the auto-scroll hook
  useAutoScroll();
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
  return <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="blob-effect"></div>
      <div className="blob-effect" style={{
      left: '60vw',
      animationDelay: '-5s'
    }}></div>
      
      {/* Desktop header - hidden on mobile */}
      {!isMobile && <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-md py-3' : 'bg-transparent py-5'}`}>
          <div className="container mx-auto flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold gradient-text">
              9.B
            </Link>
            <nav className="flex gap-6">
              <Link to="/program" className={`font-medium transition-colors relative ${isActive('/program') ? 'text-purple' : 'text-gray-700 hover:text-purple'}`}>
                {isActive('/program') && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple rounded-full"></span>}
                Program
              </Link>
              <Link to="/trida" className={`font-medium transition-colors relative ${isActive('/trida') ? 'text-purple' : 'text-gray-700 hover:text-purple'}`}>
                {isActive('/trida') && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple rounded-full"></span>}
                Třída
              </Link>
              <Link to="/galerie" className={`font-medium transition-colors relative ${isActive('/galerie') ? 'text-purple' : 'text-gray-700 hover:text-purple'}`}>
                {isActive('/galerie') && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple rounded-full"></span>}
                Galerie
              </Link>
              <Link to="/vzpominky" className={`font-medium transition-colors relative ${isActive('/vzpominky') ? 'text-purple' : 'text-gray-700 hover:text-purple'}`}>
                {isActive('/vzpominky') && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple rounded-full"></span>}
                Vzpomínky
              </Link>
              <Link to="/info" className={`font-medium transition-colors relative ${isActive('/info') ? 'text-purple' : 'text-gray-700 hover:text-purple'}`}>
                {isActive('/info') && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple rounded-full"></span>}
                Info
              </Link>
            </nav>
          </div>
        </header>}
      
      {/* Main content */}
      <main className="flex-grow pt-24 pb-28 md:pb-16">
        {children}
      </main>
      
      {/* Mobile bottom navigation */}
      {isMobile && <BottomNav />}
      
      <footer className="p-4 text-center text-sm text-gray-500 font-caveat pb-20 md:pb-5">
        Web vytvořil David Šíma
      </footer>
    </div>;
};
export default AppLayout;