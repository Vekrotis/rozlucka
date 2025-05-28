
import React, { useState, useEffect, useRef } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { X as CloseIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export type MediaItem = {
  id: string;
  type: 'image' | 'video' | 'audio';
  src: string;
  alt?: string;
  description?: string;
  thumbnail?: string;
};

interface MediaViewerProps {
  isOpen: boolean;
  onClose: () => void;
  mediaItems: MediaItem[];
  currentIndex: number;
  onIndexChange: (newIndex: number) => void;
}

const MediaViewer: React.FC<MediaViewerProps> = ({
  isOpen,
  onClose,
  mediaItems,
  currentIndex,
  onIndexChange
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const currentItem = mediaItems[currentIndex];
  const isMobile = useIsMobile();

  // Minimum distance for swipe detection
  const minSwipeDistance = 50;

  useEffect(() => {
    setIsLoading(true);
    // Reset zoom level when changing media
    setZoomLevel(1);
    setSwipeOffset(0);
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          handlePrevious();
          break;
        case 'ArrowRight':
          event.preventDefault();
          handleNext();
          break;
        case 'Escape':
          event.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, mediaItems.length]);

  const handlePrevious = () => {
    if (isTransitioning) return;
    const newIndex = currentIndex > 0 ? currentIndex - 1 : mediaItems.length - 1;
    setIsTransitioning(true);
    onIndexChange(newIndex);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    const newIndex = currentIndex < mediaItems.length - 1 ? currentIndex + 1 : 0;
    setIsTransitioning(true);
    onIndexChange(newIndex);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.max(prev - 0.25, 1));
  };
  
  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(1);
  };

  // Touch event handlers for swipe gestures with smooth animation
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setSwipeOffset(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const currentTouch = e.targetTouches[0].clientX;
    const diff = currentTouch - touchStart;
    
    // Limit swipe distance to prevent over-swiping
    const maxOffset = window.innerWidth * 0.3;
    const limitedOffset = Math.max(-maxOffset, Math.min(maxOffset, diff));
    
    setSwipeOffset(limitedOffset);
    setTouchEnd(currentTouch);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setSwipeOffset(0);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    // Smooth return animation
    setSwipeOffset(0);

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }
  };

  if (!currentItem) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-[95vw] h-[90vh] p-0 bg-black/90 border-none text-white md:rounded-xl rounded-2xl overflow-hidden">
        <DialogTitle className="sr-only">Prohlížeč médií</DialogTitle>
        <div className="relative w-full h-full flex flex-col">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-3 rounded-full bg-black/40 hover:bg-black/60 transition-colors backdrop-blur-sm"
            aria-label="Zavřít"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
          
          {/* Media counter - desktop only */}
          {!isMobile && (
            <div className="absolute top-4 left-4 z-20 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
              {currentIndex + 1} / {mediaItems.length}
            </div>
          )}
          
          {/* Media counter - mobile only */}
          {isMobile && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
              {currentIndex + 1} / {mediaItems.length}
            </div>
          )}
          
          {/* Media container with touch events */}
          <div 
            className="flex-grow flex items-center justify-center relative overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            ref={contentRef}
            style={{
              transform: isMobile ? `translateX(${swipeOffset}px)` : 'none',
              transition: swipeOffset === 0 && !isTransitioning ? 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
            }}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-t-purple border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            {currentItem.type === 'image' ? (
              <div 
                className="relative w-full h-full flex items-center justify-center p-4 md:p-8"
                style={{ 
                  cursor: zoomLevel > 1 ? 'move' : 'default',
                  touchAction: isMobile ? 'pan-x' : 'auto'
                }}
              >
                <img
                  src={currentItem.src}
                  alt={currentItem.alt || "Image"}
                  className={`transition-transform duration-200 object-contain ${
                    isMobile 
                      ? 'max-h-full max-w-full' 
                      : 'max-h-[70vh] max-w-[80vw]'
                  }`}
                  style={{ 
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'center',
                  }}
                  onLoad={handleImageLoad}
                />
              </div>
            ) : currentItem.type === 'video' ? (
              <div className={`relative ${isMobile ? 'w-full h-full p-4' : 'w-auto h-auto'} flex items-center justify-center`}>
                <video
                  src={currentItem.src}
                  controls
                  autoPlay
                  className={isMobile ? 'max-h-full max-w-full' : 'h-[70vh] w-auto'}
                  onLoadedData={handleImageLoad}
                  poster={currentItem.thumbnail || `${currentItem.src}#t=0.5`}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="p-8 rounded-full bg-purple/30 mb-4">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                  </svg>
                </div>
                <audio
                  src={currentItem.src}
                  controls
                  autoPlay
                  className="w-3/4 max-w-md"
                  onLoadedData={handleImageLoad}
                />
              </div>
            )}
            
            {/* Navigation buttons - hidden on mobile */}
            {!isMobile && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/40 hover:bg-black/60 transition-all backdrop-blur-sm hover:scale-110"
                  aria-label="Previous"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/40 hover:bg-black/60 transition-all backdrop-blur-sm hover:scale-110"
                  aria-label="Next"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </>
            )}
            
            {/* Zoom controls (only for images and not on mobile) */}
            {currentItem.type === 'image' && !isMobile && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2 bg-black/50 backdrop-blur-sm rounded-full p-2">
                <button 
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 1}
                  className="p-2 rounded-full hover:bg-black/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-110"
                  aria-label="Oddálit"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/>
                  </svg>
                </button>
                <button 
                  onClick={handleReset}
                  className="p-2 rounded-full hover:bg-black/40 transition-all hover:scale-110"
                  aria-label="Resetovat zoom"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v7h7M4 11l7-7M20 20v-7h-7M20 13l-7 7"/>
                  </svg>
                </button>
                <button 
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 3}
                  className="p-2 rounded-full hover:bg-black/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-110"
                  aria-label="Přiblížit"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                  </svg>
                </button>
              </div>
            )}

            {/* Swipe indicator for mobile */}
            {isMobile && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                <div className="flex items-center gap-2 text-white/60 text-xs bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
                  </svg>
                  <span>Swipe</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </div>
              </div>
            )}
          </div>
          
          {/* Caption/description */}
          {currentItem.description && (
            <div className="p-4 bg-black/80 backdrop-blur-sm text-center border-t border-white/10">
              <p className="text-sm text-white/90">{currentItem.description}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaViewer;
