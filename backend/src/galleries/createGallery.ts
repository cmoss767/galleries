import { Firestore } from '@google-cloud/firestore';
import * as functions from '@google-cloud/functions-framework';

const firestore = new Firestore();

interface CreateGalleryRequest {
  name: string;
  description: string;
  userId: string;
  theme?: string;
}

export const createGallery = functions.http('createGallery', async (req, res) => {
  try {
    const { name, description, userId, theme } = req.body as CreateGalleryRequest;
    
    const gallery = {
      name,
      description,
      userId,
      theme: theme || 'default',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageCount: 0
    };

    const docRef = await firestore.collection('galleries').add(gallery);
    
    res.json({ 
      id: docRef.id,
      ...gallery 
    });
  } catch (error) {
    console.error('Error creating gallery:', error);
    res.status(500).json({ error: 'Failed to create gallery' });
  }
}); 