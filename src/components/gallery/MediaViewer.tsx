
import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { X as CloseIcon } from 'lucide-react';

export type MediaItem = {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt?: string;
  description?: string;
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
  const currentItem = mediaItems[currentIndex];

  useEffect(() => {
    setIsLoading(true);
    // Reset zoom level when changing media
    setZoomLevel(1);
  }, [currentIndex]);

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = currentIndex > 0 ? currentIndex - 1 : mediaItems.length - 1;
    onIndexChange(newIndex);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = currentIndex < mediaItems.length - 1 ? currentIndex + 1 : 0;
    onIndexChange(newIndex);
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

  if (!currentItem) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] h-[90vh] p-0 bg-black/90 border-none text-white md:rounded-xl rounded-2xl overflow-hidden">
        <DialogTitle className="sr-only">Prohlížeč médií</DialogTitle>
        <div className="relative w-full h-full flex flex-col">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
            aria-label="Zavřít"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
          
          {/* Media container */}
          <div className="flex-grow flex items-center justify-center relative overflow-auto">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-t-purple border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            {currentItem.type === 'image' ? (
              <div 
                className="relative w-full h-full flex items-center justify-center overflow-auto"
                style={{ 
                  cursor: zoomLevel > 1 ? 'move' : 'default'
                }}
              >
                <img
                  src={currentItem.src}
                  alt={currentItem.alt || "Image"}
                  className="max-w-none object-contain transition-transform duration-200"
                  style={{ 
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'center',
                    maxHeight: '100%',
                    maxWidth: '100%'
                  }}
                  onLoad={handleImageLoad}
                />
              </div>
            ) : (
              <video
                src={currentItem.src}
                controls
                autoPlay
                className="max-h-full max-w-full"
                onLoadedData={handleImageLoad}
                poster={`${currentItem.src}#t=0.5`}
              />
            )}
            
            {/* Navigation buttons */}
            <button 
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
              aria-label="Previous"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            
            <button 
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
              aria-label="Next"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
            
            {/* Zoom controls (only for images) */}
            {currentItem.type === 'image' && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex gap-2 bg-black/40 rounded-full p-1">
                <button 
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 1}
                  className="p-2 rounded-full hover:bg-black/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Oddálit"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/>
                  </svg>
                </button>
                <button 
                  onClick={handleReset}
                  className="p-2 rounded-full hover:bg-black/30 transition-colors"
                  aria-label="Resetovat zoom"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v7h7M4 11l7-7M20 20v-7h-7M20 13l-7 7"/>
                  </svg>
                </button>
                <button 
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 3}
                  className="p-2 rounded-full hover:bg-black/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Přiblížit"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                  </svg>
                </button>
              </div>
            )}
          </div>
          
          {/* Caption/description */}
          {currentItem.description && (
            <div className="p-4 bg-black/70 text-center">
              <p className="text-sm">{currentItem.description}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaViewer;
