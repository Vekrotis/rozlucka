
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import AlbumSelector, { Album } from '@/components/gallery/AlbumSelector';
import MediaViewer, { MediaItem } from '@/components/gallery/MediaViewer';
import { Button } from '@/components/ui/button';

// Sample data - in a real app, this would come from a database or API
const SAMPLE_ALBUMS: Album[] = [
  { id: '1', title: '1. třída', description: 'První kroky ve škole', count: 12 },
  { id: '2', title: 'Výlety', description: 'Dobrodružství mimo školu', count: 8 },
  { id: '3', title: 'Škola v přírodě', description: 'Týden plný zábavy', count: 15 },
  { id: '4', title: '9. třída', description: 'Poslední rok', count: 10 },
];

// Sample media items - in a real app, these would be filtered by album
const SAMPLE_MEDIA: { [key: string]: MediaItem[] } = {
  '1': [
    { id: '101', type: 'image', src: 'public/20250328_085338000_iOS.jpg', alt: 'První školní den', description: 'První školní den - září 2016' },
    { id: '102', type: 'video', src: 'public/05-06-2022_121051.mp4', alt: 'Naše třída', description: 'Naše první třída' },
    { id: '103', type: 'video', src: 'public/Screen Recording 2025-05-12 at 8.38.55 PM2.remuxed.mov', description: 'Video z první besídky' },
  ],
  '3': [
    { id: '301', type: 'image', src: 'public/20250328_085338000_iOS.jpg', alt: 'Škola v přírodě', description: 'Škola v přírodě - 2019' },
    { id: '302', type: 'video', src: 'public/20250328_085338000_iOS.jpg', description: 'Táborák' },
    { id: '303', type: 'image', src: 'public/20250328_085338000_iOS.jpg', alt: 'Les', description: 'Výlet do lesa' },
  ],
  '4': [
    { id: '401', type: 'image', src: 'public/20250328_085338000_iOS.jpg', alt: '9. třída', description: 'Poslední školní rok - 2025' },
    { id: '402', type: 'image', src: 'public/20250328_085338000_iOS.jpg', alt: 'Kamarádi', description: 'Přátelé na celý život' },
  ]
};

const Galerie = () => {
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [isAlbumSelectorOpen, setIsAlbumSelectorOpen] = useState<boolean>(false);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [isMediaViewerOpen, setIsMediaViewerOpen] = useState<boolean>(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState<number>(0);
  
  useEffect(() => {
    setShowAnimation(true);
  }, []);

  const handleAlbumSelect = (albumId: string) => {
    setSelectedAlbum(albumId);
    setIsAlbumSelectorOpen(false);
  };

  const handleMediaClick = (index: number) => {
    setCurrentMediaIndex(index);
    setIsMediaViewerOpen(true);
  };

  // Get currently displayed media items based on selected album
  const currentMediaItems = selectedAlbum ? SAMPLE_MEDIA[selectedAlbum] || [] : [];
  
  // Determine if the media item is an image or video based on file extension
  const getMediaType = (src: string): 'image' | 'video' => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    return videoExtensions.some(ext => src.toLowerCase().endsWith(ext)) ? 'video' : 'image';
  };

  return (
    <AppLayout>
      <section className={`min-h-[90vh] px-4 py-24 md:py-32 opacity-0 ${showAnimation ? 'animate-fade-in' : ''}`}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Galerie</span> vzpomínek
          </h1>
          
          <p className="text-lg text-gray-700 mb-8">
            Projděte si fotografie a vzpomínky na naši společnou cestu základní školou. 
            Zde najdete nejdůležitější momenty z našich devíti let.
          </p>
          
          <div className="glass rounded-2xl p-6 mb-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">
                {selectedAlbum 
                  ? SAMPLE_ALBUMS.find(a => a.id === selectedAlbum)?.title || 'Album'
                  : 'Všechny vzpomínky'
                }
              </h2>
              
              <Button 
                onClick={() => setIsAlbumSelectorOpen(true)}
                className="rounded-full bg-white hover:bg-purple/10 text-gray-700 hover:text-purple border border-gray-200"
                variant="ghost"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/>
                </svg>
                Vybrat album
              </Button>
            </div>
          </div>
          
          {/* Media grid */}
          {selectedAlbum ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {currentMediaItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="aspect-square rounded-xl overflow-hidden glass hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
                  onClick={() => handleMediaClick(index)}
                >
                  {item.type === 'image' ? (
                    <div className="w-full h-full bg-gray-100">
                      <img 
                        src={item.src} 
                        alt={item.alt || "Image"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gray-100 relative">
                      <img 
                        src={item.src + '#poster'} 
                        alt={item.alt || "Video thumbnail"}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center pl-1">
                          <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">Vyberte album pro zobrazení fotografií a videí.</p>
              <Button 
                onClick={() => setIsAlbumSelectorOpen(true)}
                className="mt-4 rounded-full"
                variant="outline"
              >
                Vybrat album
              </Button>
            </div>
          )}
          
          {currentMediaItems.length === 0 && selectedAlbum && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">V tomto albu zatím nejsou žádné vzpomínky 😭.</p>
            </div>
          )}
        </div>
      </section>

      {/* Album selector dialog */}
      <AlbumSelector 
        isOpen={isAlbumSelectorOpen}
        onClose={() => setIsAlbumSelectorOpen(false)}
        onSelect={handleAlbumSelect}
        albums={SAMPLE_ALBUMS}
      />
      
      {/* Media viewer */}
      {currentMediaItems.length > 0 && (
        <MediaViewer
          isOpen={isMediaViewerOpen}
          onClose={() => setIsMediaViewerOpen(false)}
          mediaItems={currentMediaItems}
          currentIndex={currentMediaIndex}
          onIndexChange={setCurrentMediaIndex}
        />
      )}
    </AppLayout>
  );
};

export default Galerie;
