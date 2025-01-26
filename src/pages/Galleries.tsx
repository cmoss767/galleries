import { useState, useEffect } from 'react';
import { collection, addDoc, query, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import type { Gallery } from '../types/gallery';

const Galleries = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showNewForm, setShowNewForm] = useState(false);
  const [newGallery, setNewGallery] = useState({ name: '', description: '' });
  const { user } = useAuth();

  useEffect(() => {
    fetchGalleries();
  }, [user]);

  const fetchGalleries = async () => {
    try {
      const q = query(collection(db, 'galleries'));
      const querySnapshot = await getDocs(q);
      const galleriesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Gallery));
      setGalleries(galleriesData);
    } catch (err) {
      console.error('Error fetching galleries:', err);
      setError('Failed to load galleries');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'galleries'), {
        ...newGallery,
        userId: user?.uid,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        imageCount: 0
      });

      const newGalleryData: Gallery = {
        id: docRef.id,
        ...newGallery,
        userId: user?.uid || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        imageCount: 0
      };

      setGalleries([...galleries, newGalleryData]);
      setNewGallery({ name: '', description: '' });
      setShowNewForm(false);
    } catch (err) {
      console.error('Error creating gallery:', err);
      setError('Failed to create gallery');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>Galleries</h1>
        <button
          onClick={() => setShowNewForm(!showNewForm)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#1a1a1a',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          {showNewForm ? 'Cancel' : 'New Gallery'}
        </button>
      </div>

      {showNewForm && (
        <form onSubmit={handleCreateGallery} style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Name</label>
            <input
              type="text"
              value={newGallery.name}
              onChange={(e) => setNewGallery({ ...newGallery, name: e.target.value })}
              style={{ width: '100%', padding: '8px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
            <textarea
              value={newGallery.description}
              onChange={(e) => setNewGallery({ ...newGallery, description: e.target.value })}
              style={{ width: '100%', padding: '8px', minHeight: '100px' }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            Create Gallery
          </button>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {galleries.map(gallery => (
          <Link 
            key={gallery.id} 
            to={`/galleries/${gallery.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{ 
              padding: '20px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '8px',
              transition: 'transform 0.2s',
            }}>
              <h3>{gallery.name}</h3>
              <p>{gallery.description}</p>
              <div style={{ color: '#666', fontSize: '0.9em' }}>
                {gallery.imageCount} images
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Galleries; 