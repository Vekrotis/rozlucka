
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from './use-mobile';

export function useAutoScroll() {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Only auto-scroll on mobile devices
    if (isMobile) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        window.scrollTo({
          top: 80, // Scroll just enough to see page title
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [location.pathname, isMobile]);
}
