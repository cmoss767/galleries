import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export const login = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  return signOut(auth);
};

export const getAuthToken = async (): Promise<string> => {
  const user = auth.currentUser;
  
  if (!user) {
    throw new Error('No user logged in');
  }
  
  return user.getIdToken();
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export interface RegisterData {
  email: string;
  password: string;
  displayName: string;
}

export const register = async (data: RegisterData) => {
  // 1. Create the auth user
  const { user } = await createUserWithEmailAndPassword(
    auth, 
    data.email, 
    data.password
  );

  // 2. Create the Firestore user document
  await setDoc(doc(db, 'users', user.uid), {
    email: data.email,
    displayName: data.displayName,
    role: 'user', // New users are regular users by default
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  return user;
}; 