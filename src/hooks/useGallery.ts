
import { useState, useEffect } from 'react';

export type Album = {
  id: string;
  title: string;
  description?: string;
  cover_image?: string;
  count: number; // Make this required to match AlbumSelector
  created_at?: string;
  updated_at?: string;
};

export type MediaItem = {
  id: string;
  album_id?: string;
  type: 'image' | 'video' | 'audio';
  file_name: string;
  file_path: string;
  file_size?: number;
  mime_type?: string;
  title?: string;
  description?: string;
  alt_text?: string;
  duration?: number;
  thumbnail_path?: string;
  metadata?: any;
  sort_order?: number;
  src: string; // for compatibility with existing MediaViewer
  alt?: string; // for compatibility with existing MediaViewer
};

// Mock data to use while database is being set up
const mockAlbums: Album[] = [
  { id: '1', title: '1. třída', description: 'První kroky ve škole', cover_image: '/20250328_085338000_iOS.jpg', count: 3 },
  { id: '2', title: 'Výlety', description: 'Dobrodružství mimo školu', cover_image: '/20250328_085338000_iOS.jpg', count: 2 },
  { id: '3', title: 'Škola v přírodě', description: 'Týden plný zábavy', cover_image: '/20250328_085338000_iOS.jpg', count: 0 },
  { id: '4', title: '9. třída', description: 'Poslední rok', cover_image: '/20250328_085338000_iOS.jpg', count: 2 },
  { id: '5', title: 'Sport', description: 'Sportovní úspěchy', cover_image: '/20250328_085338000_iOS.jpg', count: 2 },
  { id: '6', title: 'Besídky', description: 'Školní představení', cover_image: '/20250328_085338000_iOS.jpg', count: 2 },
  { id: '7', title: 'Výtvarná výchova', description: 'Naše umělecká díla', cover_image: '/20250328_085338000_iOS.jpg', count: 1 },
  { id: '8', title: 'Projekty', description: 'Školní projekty', cover_image: '/20250328_085338000_iOS.jpg', count: 2 },
  { id: '9', title: 'Výlety do přírody', description: 'Zážitky z přírody', cover_image: '/20250328_085338000_iOS.jpg', count: 2 },
  { id: '10', title: 'Písničky', description: 'Naše oblíbené melodie', cover_image: '/20250328_085338000_iOS.jpg', count: 3 }
];

const mockMediaItems: { [albumId: string]: MediaItem[] } = {
  '1': [
    {
      id: '1',
      album_id: '1',
      type: 'image',
      file_name: '20250328_085338000_iOS.jpg',
      file_path: '/20250328_085338000_iOS.jpg',
      title: 'První školní den',
      description: 'První školní den - září 2016',
      alt_text: 'První školní den',
      sort_order: 1,
      src: '/20250328_085338000_iOS.jpg',
      alt: 'První školní den'
    },
    {
      id: '2',
      album_id: '1',
      type: 'video',
      file_name: '05-06-2022_121051.mp4',
      file_path: '/vid/05-06-2022_121051.mp4',
      title: 'Naše třída',
      description: 'Naše první třída',
      alt_text: 'Naše třída',
      sort_order: 2,
      src: '/vid/05-06-2022_121051.mp4',
      alt: 'Naše třída'
    },
    {
      id: '3',
      album_id: '1',
      type: 'video',
      file_name: 'Screen Recording 2025-05-12-01.mp4',
      file_path: '/vid/Screen Recording 2025-05-12-01.mp4',
      title: 'Video z první besídky',
      description: 'Video z první besídky',
      alt_text: '',
      sort_order: 3,
      src: '/vid/Screen Recording 2025-05-12-01.mp4',
      alt: ''
    }
  ],
  '2': [
    {
      id: '4',
      album_id: '2',
      type: 'image',
      file_name: '20250328_085338000_iOS.jpg',
      file_path: '/20250328_085338000_iOS.jpg',
      title: 'Výlet do ZOO',
      description: 'Výlet do ZOO - 2018',
      alt_text: 'Výlet do ZOO',
      sort_order: 1,
      src: '/20250328_085338000_iOS.jpg',
      alt: 'Výlet do ZOO'
    },
    {
      id: '5',
      album_id: '2',
      type: 'video',
      file_name: '05-06-2022_121051.mp4',
      file_path: '/vid/05-06-2022_121051.mp4',
      title: 'Výlet do muzea',
      description: 'Výlet do muzea',
      alt_text: '',
      sort_order: 2,
      src: '/vid/05-06-2022_121051.mp4',
      alt: ''
    }
  ],
  '4': [
    {
      id: '6',
      album_id: '4',
      type: 'image',
      file_name: '20250328_085338000_iOS.jpg',
      file_path: '/20250328_085338000_iOS.jpg',
      title: '9. třída',
      description: 'Poslední školní rok - 2025',
      alt_text: '9. třída',
      sort_order: 1,
      src: '/20250328_085338000_iOS.jpg',
      alt: '9. třída'
    },
    {
      id: '7',
      album_id: '4',
      type: 'image',
      file_name: '20250328_085338000_iOS.jpg',
      file_path: '/20250328_085338000_iOS.jpg',
      title: 'Kamarádi',
      description: 'Přátelé na celý život',
      alt_text: 'Kamarádi',
      sort_order: 2,
      src: '/20250328_085338000_iOS.jpg',
      alt: 'Kamarádi'
    }
  ],
  '5': [
    {
      id: '8',
      album_id: '5',
      type: 'image',
      file_name: '20250328_085338000_iOS.jpg',
      file_path: '/20250328_085338000_iOS.jpg',
      title: 'Fotbalový zápas',
      description: 'Meziškolní turnaj - 2022',
      alt_text: 'Fotbalový zápas',
      sort_order: 1,
      src: '/20250328_085338000_iOS.jpg',
      alt: 'Fotbalový zápas'
    },
    {
      id: '9',
      album_id: '5',
      type: 'video',
      file_name: '05-06-2022_121051.mp4',
      file_path: '/vid/05-06-2022_121051.mp4',
      title: 'Atletické závody',
      description: 'Atletické závody',
      alt_text: '',
      sort_order: 2,
      src: '/vid/05-06-2022_121051.mp4',
      alt: ''
    }
  ],
  '6': [
    {
      id: '10',
      album_id: '6',
      type: 'image',
      file_name: '20250328_085338000_iOS.jpg',
      file_path: '/20250328_085338000_iOS.jpg',
      title: 'Vánoční besídka',
      description: 'Vánoční besídka - 2023',
      alt_text: 'Vánoční besídka',
      sort_order: 1,
      src: '/20250328_085338000_iOS.jpg',
      alt: 'Vánoční besídka'
    },
    {
      id: '11',
      album_id: '6',
      type: 'video',
      file_name: '05-06-2022_121051.mp4',
      file_path: '/vid/05-06-2022_121051.mp4',
      title: 'Vystoupení 3. třída',
      description: 'Vystoupení 3. třída',
      alt_text: '',
      sort_order: 2,
      src: '/vid/05-06-2022_121051.mp4',
      alt: ''
    }
  ],
  '7': [
    {
      id: '12',
      album_id: '7',
      type: 'image',
      file_name: '20250328_085338000_iOS.jpg',
      file_path: '/20250328_085338000_iOS.jpg',
      title: 'Výtvarná práce',
      description: 'Projekt Příroda - 2021',
      alt_text: 'Výtvarná práce',
      sort_order: 1,
      src: '/20250328_085338000_iOS.jpg',
      alt: 'Výtvarná práce'
    }
  ],
  '8': [
    {
      id: '13',
      album_id: '8',
      type: 'image',
      file_name: '20250328_085338000_iOS.jpg',
      file_path: '/20250328_085338000_iOS.jpg',
      title: 'Ekologický projekt',
      description: 'Den Země - 2023',
      alt_text: 'Ekologický projekt',
      sort_order: 1,
      src: '/20250328_085338000_iOS.jpg',
      alt: 'Ekologický projekt'
    },
    {
      id: '14',
      album_id: '8',
      type: 'video',
      file_name: '05-06-2022_121051.mp4',
      file_path: '/vid/05-06-2022_121051.mp4',
      title: 'Prezentace projektů',
      description: 'Prezentace projektů',
      alt_text: '',
      sort_order: 2,
      src: '/vid/05-06-2022_121051.mp4',
      alt: ''
    }
  ],
  '9': [
    {
      id: '15',
      album_id: '9',
      type: 'image',
      file_name: '20250328_085338000_iOS.jpg',
      file_path: '/20250328_085338000_iOS.jpg',
      title: 'Turistika',
      description: 'Výlet na hrad - 2022',
      alt_text: 'Turistika',
      sort_order: 1,
      src: '/20250328_085338000_iOS.jpg',
      alt: 'Turistika'
    },
    {
      id: '16',
      album_id: '9',
      type: 'image',
      file_name: '20250328_085338000_iOS.jpg',
      file_path: '/20250328_085338000_iOS.jpg',
      title: 'Příroda',
      description: 'Výlet do CHKO',
      alt_text: 'Příroda',
      sort_order: 2,
      src: '/20250328_085338000_iOS.jpg',
      alt: 'Příroda'
    }
  ],
  '10': [
    {
      id: '17',
      album_id: '10',
      type: 'audio',
      file_name: 'Ondrovo Hodinky.mp3',
      file_path: '/aud/Ondrovo Hodinky.mp3',
      title: 'Školní hymna',
      description: 'Školní hymna',
      alt_text: '',
      sort_order: 1,
      src: '/aud/Ondrovo Hodinky.mp3',
      alt: ''
    },
    {
      id: '18',
      album_id: '10',
      type: 'audio',
      file_name: '05-06-2022_121051.mp4',
      file_path: '/vid/05-06-2022_121051.mp4',
      title: 'Sborový zpěv 6. třída',
      description: 'Sborový zpěv 6. třída',
      alt_text: '',
      sort_order: 2,
      src: '/vid/05-06-2022_121051.mp4',
      alt: ''
    },
    {
      id: '19',
      album_id: '10',
      type: 'audio',
      file_name: '05-06-2022_121051.mp4',
      file_path: '/vid/05-06-2022_121051.mp4',
      title: 'Absolventská píseň',
      description: 'Absolventská píseň',
      alt_text: '',
      sort_order: 3,
      src: '/vid/05-06-2022_121051.mp4',
      alt: ''
    }
  ]
};

export const useGallery = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlbums = async () => {
    try {
      setLoading(true);
      // Use mock data for now since database might not be set up
      setAlbums(mockAlbums);
    } catch (err) {
      console.error('Error fetching albums:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch albums');
    } finally {
      setLoading(false);
    }
  };

  const fetchMediaItems = async (albumId: string): Promise<MediaItem[]> => {
    try {
      // Return mock data for the specified album
      return mockMediaItems[albumId] || [];
    } catch (err) {
      console.error('Error fetching media items:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return {
    albums,
    loading,
    error,
    fetchAlbums,
    fetchMediaItems
  };
};
