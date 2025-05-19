
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { X as CloseIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export type Album = {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  count: number;
};

interface AlbumSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (albumId: string) => void;
  albums: Album[];
}

const AlbumSelector: React.FC<AlbumSelectorProps> = ({
  isOpen,
  onClose,
  onSelect,
  albums
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="album-selector-dialog bg-white/85 dark:bg-gray-900/85 backdrop-blur-sm border border-white/30 dark:border-white/10 p-6 max-w-lg mx-auto md:rounded-xl rounded-2xl max-h-[80vh]">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10"
          aria-label="Zavřít"
        >
          <CloseIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </button>
        
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold dark:text-white">Vyberte album</DialogTitle>
          <DialogDescription className="dark:text-gray-300">
            Prohlédněte si vzpomínky podle kategorií
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="album-selector-content max-h-[60vh] pr-4 mt-4 pb-2">
          <div className="grid grid-cols-2 gap-4 pb-2">
            {albums.map((album) => (
              <div
                key={album.id}
                onClick={() => onSelect(album.id)}
                className="p-3 rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="aspect-video rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden mb-2">
                  {album.coverImage ? (
                    <img 
                      src={album.coverImage} 
                      alt={album.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-gray-800 dark:text-gray-200">{album.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{album.count} položek</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AlbumSelector;
