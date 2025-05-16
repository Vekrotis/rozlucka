
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PopupMenu from './PopupMenu';

const BottomNav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <>
      <nav className="fixed bottom-5 left-1/2 transform -translate-x-1/2 glass p-2 z-50 rounded-full border border-white/30 shadow-lg">
        <div className="flex items-center px-2">
          <Link 
            to="/program" 
            className={`flex items-center justify-center w-12 h-12 rounded-full ${
              isActive('/program') ? 'bg-purple text-white' : 'text-gray-600 hover:bg-gray-100'
            } transition-colors`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <path strokeLinecap="round" strokeWidth="2" d="M12 6v6l4 2"/>
            </svg>
          </Link>
          
          <Link 
            to="/" 
            className={`flex items-center justify-center w-14 h-14 rounded-full mx-2 ${
              isActive('/') ? 'bg-pink text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
            } transition-colors`}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
          </Link>
          
          <button 
            onClick={toggleMenu}
            className={`flex items-center justify-center w-12 h-12 rounded-full ${
              isMenuOpen ? 'bg-purple text-white' : 'text-gray-600 hover:bg-gray-100'
            } transition-colors`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </nav>
      
      {isMenuOpen && <PopupMenu onClose={() => setIsMenuOpen(false)} />}
    </>
  );
};

export default BottomNav;
