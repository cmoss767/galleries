import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, getDocs, updateDoc, collection, addDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import type { Gallery, GalleryImage } from '../types/gallery';

const GalleryDetail = () => {
  const { galleryId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (galleryId) {
      fetchGallery();
      fetchImages();
    }
  }, [galleryId]);

  const fetchGallery = async () => {
    try {
      const docRef = doc(db, 'galleries', galleryId!);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setGallery({ id: docSnap.id, ...docSnap.data() } as Gallery);
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

  const fetchImages = async () => {
    try {
      const imagesRef = collection(db, 'galleries', galleryId!, 'images');
      const imagesSnap = await getDocs(imagesRef);
      const imagesData = imagesSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as GalleryImage));
      setImages(imagesData);
    } catch (err) {
      console.error('Error fetching images:', err);
      setError('Failed to load images');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !gallery) return;

    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Create a reference to the storage location
        const storageRef = ref(storage, `galleries/${galleryId}/${Date.now()}_${file.name}`);
        
        // Upload the file
        await uploadBytes(storageRef, file);
        
        // Get the download URL
        const url = await getDownloadURL(storageRef);
        
        // Add image record to Firestore
        const imageDoc = await addDoc(collection(db, 'galleries', galleryId!, 'images'), {
          url,
          caption: '',
          createdAt: new Date().toISOString(),
          order: images.length + i
        });

        // Add to local state
        setImages(prev => [...prev, {
          id: imageDoc.id,
          url,
          caption: '',
          createdAt: new Date().toISOString(),
          order: images.length + i
        }]);
      }

      // Update gallery image count
      const galleryRef = doc(db, 'galleries', galleryId!);
      await updateDoc(galleryRef, {
        imageCount: images.length + files.length,
        updatedAt: new Date().toISOString()
      });

      setGallery(prev => prev ? {
        ...prev,
        imageCount: prev.imageCount + files.length,
        updatedAt: new Date().toISOString()
      } : null);

    } catch (err) {
      console.error('Error uploading images:', err);
      setError('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (imageId: string, imageUrl: string) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    
    setDeleting(imageId);
    try {
      // Delete from Storage
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);

      // Delete from Firestore
      await deleteDoc(doc(db, 'galleries', galleryId!, 'images', imageId));

      // Update gallery image count
      const galleryRef = doc(db, 'galleries', galleryId!);
      await updateDoc(galleryRef, {
        imageCount: (gallery?.imageCount || 1) - 1,
        updatedAt: new Date().toISOString()
      });

      // Update local state
      setImages(images.filter(img => img.id !== imageId));
      setGallery(prev => prev ? {
        ...prev,
        imageCount: prev.imageCount - 1,
        updatedAt: new Date().toISOString()
      } : null);

    } catch (err) {
      console.error('Error deleting image:', err);
      setError('Failed to delete image');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!gallery) return <div>Gallery not found</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <button
            onClick={() => navigate('/galleries')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              marginBottom: '10px',
              cursor: 'pointer'
            }}
          >
            ← Back to Galleries
          </button>
          <h1>{gallery.name}</h1>
          <p>{gallery.description}</p>
        </div>
        <label 
          style={{
            padding: '8px 16px',
            backgroundColor: '#1a1a1a',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {uploading ? 'Uploading...' : 'Upload Images'}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            disabled={uploading}
          />
        </label>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
        gap: '20px' 
      }}>
        {images.map(image => (
          <div 
            key={image.id}
            style={{
              position: 'relative',
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
            <button
              onClick={() => handleDeleteImage(image.id, image.url)}
              disabled={deleting === image.id}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                padding: '8px',
                backgroundColor: 'rgba(220, 53, 69, 0.9)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {deleting === image.id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryDetail; 