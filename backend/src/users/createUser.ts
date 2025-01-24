import { Firestore } from '@google-cloud/firestore';
import * as functions from '@google-cloud/functions-framework';

const firestore = new Firestore();

interface CreateUserRequest {
  email: string;
  displayName: string;
  role: 'user' | 'admin';
}

export const createUser = functions.http('createUser', async (req, res) => {
  try {
    const { email, displayName, role } = req.body as CreateUserRequest;
    
    const user = {
      email,
      displayName,
      role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      galleryCount: 0
    };

    const docRef = await firestore.collection('users').add(user);
    
    res.json({ 
      id: docRef.id,
      ...user 
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
}); 