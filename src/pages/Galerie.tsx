import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import AlbumSelector, { Album } from '@/components/gallery/AlbumSelector';
import MediaViewer, { MediaItem } from '@/components/gallery/MediaViewer';
import { Button } from '@/components/ui/button';
import { Play, Music } from 'lucide-react';

// Sample data - in a real app, this would come from a database or API
const SAMPLE_ALBUMS: Album[] = [
  { id: '1', title: '1. třída', description: 'První kroky ve škole', count: 12, coverImage: '/20250328_085338000_iOS.jpg' },
  { id: '2', title: 'Výlety', description: 'Dobrodružství mimo školu', count: 8, coverImage: '/20250328_085338000_iOS.jpg' },
  { id: '3', title: 'Škola v přírodě', description: 'Týden plný zábavy', count: 15, coverImage: '/20250328_085338000_iOS.jpg' },
  { id: '4', title: '9. třída', description: 'Poslední rok', count: 10, coverImage: '/20250328_085338000_iOS.jpg' },
  { id: '5', title: 'Sport', description: 'Sportovní úspěchy', count: 6, coverImage: '/20250328_085338000_iOS.jpg' },
  { id: '6', title: 'Besídky', description: 'Školní představení', count: 9, coverImage: '/20250328_085338000_iOS.jpg' },
  { id: '7', title: 'Výtvarná výchova', description: 'Naše umělecká díla', count: 7, coverImage: '/20250328_085338000_iOS.jpg' },
  { id: '8', title: 'Projekty', description: 'Školní projekty', count: 5, coverImage: '/20250328_085338000_iOS.jpg' },
  { id: '9', title: 'Výlety do přírody', description: 'Zážitky z přírody', count: 8, coverImage: '/20250328_085338000_iOS.jpg' },
  { id: '10', title: 'Písničky', description: 'Naše oblíbené melodie', count: 3, coverImage: '/20250328_085338000_iOS.jpg' },
];

// Sample media items - in a real app, these would be filtered by album
const SAMPLE_MEDIA: { [key: string]: MediaItem[] } = {
  '1': [
    { id: '101', type: 'image', src: '/20250328_085338000_iOS.jpg', alt: 'První školní den', description: 'První školní den - září 2016' },
    { id: '102', type: 'video', src: '/05-06-2022_121051.mp4', alt: 'Naše třída', description: 'Naše první třída' },
    { id: '103', type: 'video', src: '/Screen Recording 2025-05-12 at 8.38.55 PM2.remuxed.mov', description: 'Video z první besídky' },
  ],
  '3': [
    { id: '301', type: 'image', src: '/20250328_085338000_iOS.jpg', alt: 'Škola v přírodě', description: 'Škola v přírodě - 2019' },
    { id: '302', type: 'video', src: '/05-06-2022_121051.mp4', description: 'Táborák' },
    { id: '303', type: 'image', src: '/20250328_085338000_iOS.jpg', alt: 'Les', description: 'Výlet do lesa' },
  ],
  '4': [
    { id: '401', type: 'image', src: '/20250328_085338000_iOS.jpg', alt: '9. třída', description: 'Poslední školní rok - 2025' },
    { id: '402', type: 'image', src: '/20250328_085338000_iOS.jpg', alt: 'Kamarádi', description: 'Přátelé na celý život' },
  ],
  '2': [
    { id: '201', type: 'image', src: '/20250328_085338000_iOS.jpg', alt: 'Výlet do ZOO', description: 'Výlet do ZOO - 2018' },
    { id: '202', type: 'video', src: '/05-06-2022_121051.mp4', description: 'Výlet do muzea' },
  ],
  '5': [
    { id: '501', type: 'image', src: '/20250328_085338000_iOS.jpg', alt: 'Fotbalový zápas', description: 'Meziškolní turnaj - 2022' },
    { id: '502', type: 'video', src: '/05-06-2022_121051.mp4', description: 'Atletické závody' },
  ],
  '6': [
    { id: '601', type: 'image', src: '/20250328_085338000_iOS.jpg', alt: 'Vánoční besídka', description: 'Vánoční besídka - 2023' },
    { id: '602', type: 'video', src: '/05-06-2022_121051.mp4', description: 'Vystoupení 3. třída' },
  ],
  '7': [
    { id: '701', type: 'image', src: '/20250328_085338000_iOS.jpg', alt: 'Výtvarná práce', description: 'Projekt Příroda - 2021' },
    { id: '702', type: 'image', src: '/20250328_085338000_iOS.jpg', alt: 'Výstava prací', description: 'Školní výstava' },
  ],
  '8': [
    { id: '801', type: 'image', src: '/20250328_085338000_iOS.jpg', alt: 'Ekologický projekt', description: 'Den Země - 2023' },
    { id: '802', type: 'video', src: '/05-06-2022_121051.mp4', description: 'Prezentace projektů' },
  ],
  '9': [
    { id: '901', type: 'image', src: '/20250328_085338000_iOS.jpg', alt: 'Turistika', description: 'Výlet na hrad - 2022' },
    { id: '902', type: 'image', src: '/20250328_085338000_iOS.jpg', alt: 'Příroda', description: 'Výlet do CHKO' },
  ],
  '10': [
    { id: '1001', type: 'audio', src: '/05-06-2022_121051.mp4', description: 'Školní hymna' },
    { id: '1002', type: 'audio', src: '/05-06-2022_121051.mp4', description: 'Sborový zpěv 6. třída' },
    { id: '1003', type: 'audio', src: '/05-06-2022_121051.mp4', description: 'Absolventská píseň' },
  ],
};

const Galerie = () => {
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [isAlbumSelectorOpen, setIsAlbumSelectorOpen] = useState<boolean>(false);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [isMediaViewerOpen, setIsMediaViewerOpen] = useState<boolean>(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState<number>(0);
  const [videoRefs] = useState<{ [key: string]: React.RefObject<HTMLVideoElement> }>({});
  
  useEffect(() => {
    setShowAnimation(true);
    
    // Create video refs for all video items
    Object.keys(SAMPLE_MEDIA).forEach(albumId => {
      SAMPLE_MEDIA[albumId].forEach(item => {
        if (item.type === 'video') {
          videoRefs[item.id] = React.createRef<HTMLVideoElement>();
        }
      });
    });
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

  return (
    <AppLayout>
      <section className={`min-h-[90vh] px-4 py-24 md:py-32 opacity-0 ${showAnimation ? 'animate-fade-in' : ''}`}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 select-none">
            <span className="gradient-text">Galerie</span> vzpomínek
          </h1>
          
          <p className="text-lg text-gray-700 mb-8 select-none">
            Projděte si fotografie a vzpomínky na naši společnou cestu základní školou. 
            Zde najdete nejdůležitější momenty z našich devíti let.
          </p>
          
          <div className="glass rounded-2xl p-6 mb-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-xl font-semibold select-none">
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
                        className="w-full h-full object-cover select-none"
                      />
                    </div>
                  ) : item.type === 'video' ? (
                    <div className="w-full h-full bg-gray-100 relative">
                      {/* Video element for auto-thumbnail generation */}
                      <div className="w-full h-full">
                        <video 
                          src={item.src}
                          className="w-full h-full object-cover"
                          muted
                          preload="metadata"
                          ref={videoRefs[item.id]}
                          onLoadedMetadata={(e) => {
                            // Set current time to generate thumbnail
                            const video = e.currentTarget;
                            if (video.duration) {
                              // Set to 25% into the video for a good thumbnail
                              video.currentTime = video.duration * 0.25;
                            }
                          }}
                        >
                          <source src={item.src} type="video/mp4" />
                        </video>
                      </div>
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="w-16 h-16 rounded-full bg-black/40 flex items-center justify-center">
                          <Play className="w-8 h-8 text-white fill-white" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple/20 to-lightblue/30 flex items-center justify-center">
                      <div className="p-6 rounded-full bg-white/80 flex items-center justify-center">
                        <Music className="w-12 h-12 text-purple" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500 select-none">Vyberte album pro zobrazení fotografií a videí.</p>
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
              <p className="text-lg text-gray-500 select-none">V tomto albu zatím nejsou žádné vzpomínky 😭.</p>
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
