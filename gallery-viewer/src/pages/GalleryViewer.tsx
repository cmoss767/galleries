import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import type { Gallery, GalleryImage } from '../types/gallery';

const GalleryViewer = () => {
  const { galleryId } = useParams();
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (galleryId) {
      fetchGallery();
    }
  }, [galleryId]);

  const fetchGallery = async () => {
    console.log('Fetching gallery:', galleryId);
    try {
      const docRef = doc(db, 'galleries', galleryId!);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        console.log('Gallery data:', docSnap.data());
        setGallery({ id: docSnap.id, ...docSnap.data() } as Gallery);
        
        // Fetch images
        const imagesRef = collection(db, 'galleries', galleryId!, 'images');
        const imagesSnap = await getDocs(imagesRef);
        const imagesData = imagesSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as GalleryImage));
        setImages(imagesData);
      } else {
        setError('Gallery not found');
      }
    } catch (err) {
      console.error('Error fetching gallery:', err);
      setError('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!gallery) return <div>Gallery not found</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>{gallery.name}</h1>
      <p>{gallery.description}</p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '20px',
        marginTop: '20px'
      }}>
        {images.map(image => (
          <div 
            key={image.id}
            style={{
              aspectRatio: '1',
              overflow: 'hidden',
              borderRadius: '8px',
              backgroundColor: '#f8f9fa'
            }}
          >
            <img
              src={image.url}
              alt={image.caption || ''}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryViewer; 