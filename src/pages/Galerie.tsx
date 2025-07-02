import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import GradientButton from '@/components/ui/GradientButton';

const Galerie = () => {
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  
  useEffect(() => {
    // Use requestAnimationFrame for smoother animation
    const timeout = requestAnimationFrame(() => {
      setShowAnimation(true);
    });
    
    return () => cancelAnimationFrame(timeout);
  }, []);

  return (
    <AppLayout>
      <section className={`min-h-[90vh] flex items-center justify-center px-4 py-24 md:py-32 opacity-0 ${showAnimation ? 'animate-fade-in' : ''}`}>
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 select-none">
            <span className="gradient-text">Galerie</span> vzpomínek
          </h1>
          
          <div className="glass rounded-2xl p-8 md:p-12 bg-white/70 dark:bg-gray-900/60">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple/20 to-lightblue/30 dark:from-purple/40 dark:to-lightblue/30 flex items-center justify-center">
              <svg className="w-8 h-8 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            
            <GradientButton
              to="https://zsjvm-my.sharepoint.com/:f:/g/personal/buchtova_lenka_zsamsostrov_cz/Eq2aAFuM7tBDvii2g2CdBmEBXplzLPAxdLY13aRx75bK5g?e=wkNjCu"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto text-lg px4 py-1"
            >
              Otevřít galerii fotek
            </GradientButton>
            <p className="mt-4 text-gray-700 dark:text-gray-300 text-base select-none">
              Fotky budou postupně přibývat.
            </p>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Galerie;
// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import AppLayout from '@/components/layout/AppLayout';
// import AlbumSelector from '@/components/gallery/AlbumSelector';
// import MediaViewer, { MediaItem } from '@/components/gallery/MediaViewer';
// import { Button } from '@/components/ui/button';
// import { Play, Music } from 'lucide-react';
// import { useGallery } from '@/hooks/useGallery';

// const Galerie = () => {
//   const [showAnimation, setShowAnimation] = useState<boolean>(false);
//   const [isAlbumSelectorOpen, setIsAlbumSelectorOpen] = useState<boolean>(false);
//   const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
//   const [isMediaViewerOpen, setIsMediaViewerOpen] = useState<boolean>(false);
//   const [currentMediaIndex, setCurrentMediaIndex] = useState<number>(0);
//   const [currentMediaItems, setCurrentMediaItems] = useState<MediaItem[]>([]);
//   const [loadingMedia, setLoadingMedia] = useState<boolean>(false);
  
//   const { albums, loading, error, fetchMediaItems } = useGallery();
  
//   useEffect(() => {
//     // Use requestAnimationFrame for smoother animation
//     const timeout = requestAnimationFrame(() => {
//       setShowAnimation(true);
//     });
    
//     return () => cancelAnimationFrame(timeout);
//   }, []);

//   const handleAlbumSelect = useCallback(async (albumId: string) => {
//     setSelectedAlbum(albumId);
//     setIsAlbumSelectorOpen(false);
//     setLoadingMedia(true);
    
//     try {
//       const mediaItems = await fetchMediaItems(albumId);
//       setCurrentMediaItems(mediaItems);
//     } catch (err) {
//       console.error('Failed to load media items:', err);
//       setCurrentMediaItems([]);
//     } finally {
//       setLoadingMedia(false);
//     }
//   }, [fetchMediaItems]);

//   const handleMediaClick = useCallback((index: number) => {
//     setCurrentMediaIndex(index);
//     setIsMediaViewerOpen(true);
//   }, []);

//   const handleCloseMediaViewer = useCallback(() => {
//     setIsMediaViewerOpen(false);
//   }, []);

//   const handleCloseAlbumSelector = useCallback(() => {
//     setIsAlbumSelectorOpen(false);
//   }, []);

//   const handleOpenAlbumSelector = useCallback(() => {
//     setIsAlbumSelectorOpen(true);
//   }, []);

//   const selectedAlbumData = useMemo(() => {
//     return albums.find(a => a.id === selectedAlbum);
//   }, [albums, selectedAlbum]);

//   // Memoized media grid component for better performance
//   const MediaGrid = useMemo(() => {
//     if (loading) {
//       return (
//         <div className="text-center py-12">
//           <div className="w-10 h-10 mx-auto border-4 border-t-purple border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
//           <p className="text-lg text-gray-500 dark:text-gray-400 select-none">Načítám alba...</p>
//         </div>
//       );
//     }

//     if (error) {
//       return (
//         <div className="text-center py-12">
//           <p className="text-lg text-red-500 select-none">Chyba při načítání: {error}</p>
//         </div>
//       );
//     }

//     if (!selectedAlbum) {
//       return (
//         <div className="text-center py-12">
//           <p className="text-lg text-gray-500 dark:text-gray-400 select-none">Vyberte album pro zobrazení fotografií a videí.</p>
//           <Button 
//             onClick={handleOpenAlbumSelector}
//             className="mt-4 rounded-full dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
//             variant="outline"
//           >
//             Vybrat album
//           </Button>
//         </div>
//       );
//     }

//     if (loadingMedia) {
//       return (
//         <div className="text-center py-12">
//           <div className="w-10 h-10 mx-auto border-4 border-t-purple border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
//           <p className="text-lg text-gray-500 dark:text-gray-400 select-none">Načítám obsah alba...</p>
//         </div>
//       );
//     }

//     if (currentMediaItems.length === 0) {
//       return (
//         <div className="text-center py-12">
//           <p className="text-lg text-gray-500 dark:text-gray-400 select-none">V tomto albu zatím nejsou žádné vzpomínky 😭.</p>
//         </div>
//       );
//     }

//     return (
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
//         {currentMediaItems.map((item, index) => (
//           <div 
//             key={item.id}
//             className="aspect-square rounded-xl overflow-hidden glass hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer"
//             onClick={() => handleMediaClick(index)}
//           >
//             {item.type === 'image' ? (
//               <div className="w-full h-full bg-gray-100 dark:bg-gray-800">
//                 <img 
//                   src={item.src} 
//                   alt={item.alt || "Image"}
//                   className="w-full h-full object-cover select-none"
//                   loading="lazy"
//                   decoding="async"
//                 />
//               </div>
//             ) : item.type === 'video' ? (
//               <div className="w-full h-full bg-gray-100 dark:bg-gray-800 relative">
//                 <div className="w-full h-full">
//                   <video 
//                     src={item.src}
//                     className="w-full h-full object-cover"
//                     muted
//                     preload="metadata"
//                     onLoadedMetadata={(e) => {
//                       const video = e.currentTarget;
//                       if (video.duration) {
//                         video.currentTime = video.duration * 0.25;
//                       }
//                     }}
//                   >
//                     <source src={item.src} type="video/mp4" />
//                   </video>
//                 </div>
//                 <div className="absolute inset-0 flex items-center justify-center bg-black/20">
//                   <div className="w-16 h-16 rounded-full bg-black/40 flex items-center justify-center">
//                     <Play className="w-8 h-8 text-white fill-white" />
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="w-full h-full bg-gradient-to-br from-purple/20 to-lightblue/30 dark:from-purple/40 dark:to-lightblue/30 flex items-center justify-center">
//                 <div className="p-6 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center">
//                   <Music className="w-12 h-12 text-purple" />
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   }, [selectedAlbum, currentMediaItems, handleMediaClick, handleOpenAlbumSelector, loading, error, loadingMedia]);

//   return (
//     <AppLayout>
//       <section className={`min-h-[90vh] px-4 py-24 md:py-32 opacity-0 ${showAnimation ? 'animate-fade-in' : ''}`}>
//         <div className="max-w-6xl mx-auto">
//           <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 select-none">
//             <span className="gradient-text">Galerie</span> vzpomínek
//           </h1>
          
//           <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
//             Projděte si fotografie a vzpomínky na naši společnou cestu základní školou. 
//             Zde najdete nejdůležitější momenty z našich devíti let.
//           </p>
          
//           <div className="glass rounded-2xl p-6 mb-10 bg-white/70 dark:bg-gray-900/60">
//             <div className="flex flex-wrap items-center justify-between gap-4">
//               <h2 className="text-xl font-semibold select-none dark:text-white">
//                 {selectedAlbumData?.title || 'Všechny vzpomínky'}
//               </h2>
              
//               <Button 
//                 onClick={handleOpenAlbumSelector}
//                 className="rounded-full bg-white dark:bg-gray-800 hover:bg-purple/10 dark:hover:bg-purple/20 text-gray-700 dark:text-gray-300 hover:text-purple dark:hover:text-purple border border-gray-200 dark:border-gray-700"
//                 variant="ghost"
//               >
//                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/>
//                 </svg>
//                 Vybrat album
//               </Button>
//             </div>
//           </div>
          
//           {MediaGrid}
//         </div>
//       </section>

//       {/* Album selector dialog */}
//       <AlbumSelector 
//         isOpen={isAlbumSelectorOpen}
//         onClose={handleCloseAlbumSelector}
//         onSelect={handleAlbumSelect}
//         albums={albums}
//       />
      
//       {/* Media viewer */}
//       {currentMediaItems.length > 0 && (
//         <MediaViewer
//           isOpen={isMediaViewerOpen}
//           onClose={handleCloseMediaViewer}
//           mediaItems={currentMediaItems}
//           currentIndex={currentMediaIndex}
//           onIndexChange={setCurrentMediaIndex}
//         />
//       )}
//     </AppLayout>
//   );
// };

// export default Galerie;
