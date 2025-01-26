import { useState, useEffect } from 'react';
import { collection, addDoc, query, getDocs, Timestamp, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import type { Gallery } from '../types/gallery';

const Galleries = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showNewForm, setShowNewForm] = useState(false);
  const [editingGallery, setEditingGallery] = useState<Gallery | null>(null);
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

  const handleDeleteGallery = async (galleryId: string) => {
    if (!window.confirm('Are you sure you want to delete this gallery? This cannot be undone.')) {
      return;
    }
    
    try {
      await deleteDoc(doc(db, 'galleries', galleryId));
      setGalleries(galleries.filter(g => g.id !== galleryId));
    } catch (err) {
      console.error('Error deleting gallery:', err);
      setError('Failed to delete gallery');
    }
  };

  const handleUpdateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGallery) return;

    try {
      const galleryRef = doc(db, 'galleries', editingGallery.id);
      await updateDoc(galleryRef, {
        name: editingGallery.name,
        description: editingGallery.description,
        updatedAt: new Date().toISOString()
      });

      setGalleries(galleries.map(g => 
        g.id === editingGallery.id ? editingGallery : g
      ));
      setEditingGallery(null);
    } catch (err) {
      console.error('Error updating gallery:', err);
      setError('Failed to update gallery');
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

      {editingGallery && (
        <div style={{ marginBottom: '20px' }}>
          <h2>Edit Gallery</h2>
          <form onSubmit={handleUpdateGallery}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Name</label>
              <input
                type="text"
                value={editingGallery.name}
                onChange={(e) => setEditingGallery({ ...editingGallery, name: e.target.value })}
                style={{ width: '100%', padding: '8px' }}
                required
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
              <textarea
                value={editingGallery.description}
                onChange={(e) => setEditingGallery({ ...editingGallery, description: e.target.value })}
                style={{ width: '100%', padding: '8px', minHeight: '100px' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
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
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditingGallery(null)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {galleries.map(gallery => (
          <div
            key={gallery.id}
            style={{ 
              padding: '20px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '8px',
            }}
          >
            <Link 
              to={`/galleries/${gallery.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <h3>{gallery.name}</h3>
              <p>{gallery.description}</p>
              <div style={{ color: '#666', fontSize: '0.9em' }}>
                {gallery.imageCount} images
              </div>
            </Link>
            <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
              <Link 
                to={`/galleries/${gallery.id}`}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#1a1a1a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}
              >
                View
              </Link>
              <button
                onClick={() => setEditingGallery(gallery)}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteGallery(gallery.id)}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Galleries; 