
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface PopupMenuProps {
  onClose: () => void;
}

const PopupMenu: React.FC<PopupMenuProps> = ({ onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  const handleLinkClick = () => {
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-end justify-center pb-24">
      <div 
        ref={menuRef}
        className="w-[90%] glass rounded-2xl p-5 animate-slide-in-right"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold gradient-text">Menu</h2>
          <button 
            onClick={onClose}
            className="p-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <nav className="flex flex-col space-y-3">
          <Link 
            to="/galerie" 
            onClick={handleLinkClick}
            className="p-3 rounded-xl hover:bg-purple/10 flex items-center gap-3 transition"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple to-pink flex items-center justify-center text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <span>Galerie</span>
          </Link>
          
          <Link 
            to="/trida" 
            onClick={handleLinkClick}
            className="p-3 rounded-xl hover:bg-purple/10 flex items-center gap-3 transition"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lightblue to-turquoise flex items-center justify-center text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <span>Třída</span>
          </Link>
          
          <Link 
            to="/vzpominky" 
            onClick={handleLinkClick}
            className="p-3 rounded-xl hover:bg-purple/10 flex items-center gap-3 transition"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-peach to-mandarin flex items-center justify-center text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <span>Vzpomínky</span>
          </Link>
          
          <Link 
            to="/info" 
            onClick={handleLinkClick}
            className="p-3 rounded-xl hover:bg-purple/10 flex items-center gap-3 transition"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-mint to-lightblue flex items-center justify-center text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
