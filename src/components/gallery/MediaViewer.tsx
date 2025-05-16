
import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

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
  const currentItem = mediaItems[currentIndex];

  useEffect(() => {
    setIsLoading(true);
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

  if (!currentItem) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] h-[90vh] p-0 bg-black/90 border-none text-white">
        <div className="relative w-full h-full flex flex-col">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          
          {/* Media container */}
          <div className="flex-grow flex items-center justify-center relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-t-purple border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            {currentItem.type === 'image' ? (
              <img
                src={currentItem.src}
                alt={currentItem.alt || "Image"}
                className="max-h-full max-w-full object-contain"
                onLoad={handleImageLoad}
              />
            ) : (
              <video
                src={currentItem.src}
                controls
                autoPlay
                className="max-h-full max-w-full"
                onLoadedData={handleImageLoad}
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
