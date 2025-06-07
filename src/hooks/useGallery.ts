
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type Album = {
  id: string;
  title: string;
  description?: string;
  cover_image?: string;
  count?: number;
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

export const useGallery = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlbums = async () => {
    try {
      setLoading(true);
      const { data: albumsData, error: albumsError } = await supabase
        .from('albums')
        .select('*')
        .order('created_at', { ascending: true });

      if (albumsError) throw albumsError;

      // Get media count for each album
      const albumsWithCount = await Promise.all(
        (albumsData || []).map(async (album) => {
          const { count } = await supabase
            .from('media_items')
            .select('*', { count: 'exact', head: true })
            .eq('album_id', album.id);
          
          return {
            ...album,
            count: count || 0
          };
        })
      );

      setAlbums(albumsWithCount);
    } catch (err) {
      console.error('Error fetching albums:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch albums');
    } finally {
      setLoading(false);
    }
  };

  const fetchMediaItems = async (albumId: string): Promise<MediaItem[]> => {
    try {
      const { data, error } = await supabase
        .from('media_items')
        .select('*')
        .eq('album_id', albumId)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      // Transform data to match existing MediaItem interface
      return (data || []).map(item => ({
        ...item,
        src: item.file_path,
        alt: item.alt_text || item.title || ''
      }));
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
