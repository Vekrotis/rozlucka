
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface PopupMenuProps {
  onClose: () => void;
}

const PopupMenu: React.FC<PopupMenuProps> = ({ onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    // Trigger animation after mount
    setTimeout(() => {
      setIsVisible(true);
    }, 10);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation to finish
  };
  
  const handleLinkClick = () => {
    handleClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-end justify-center pb-24">
      <div 
        ref={menuRef}
        className={`w-[90%] bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/30 transition-all duration-300 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold gradient-text">Menu</h2>
          <button 
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <nav className="flex flex-col space-y-2">
          <Link 
            to="/galerie" 
            onClick={handleLinkClick}
            className="p-3 rounded-2xl hover:bg-purple/5 flex items-center gap-3 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <span>Galerie</span>
          </Link>
          
          <Link 
            to="/trida" 
            onClick={handleLinkClick}
            className="p-3 rounded-2xl hover:bg-purple/5 flex items-center gap-3 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <span>Třída</span>
          </Link>
          
          <Link 
            to="/vzpominky" 
            onClick={handleLinkClick}
            className="p-3 rounded-2xl hover:bg-purple/5 flex items-center gap-3 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <span>Vzpomínky</span>
          </Link>
          
          <Link 
            to="/info" 
            onClick={handleLinkClick}
            className="p-3 rounded-2xl hover:bg-purple/5 flex items-center gap-3 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span>Info</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default PopupMenu;
