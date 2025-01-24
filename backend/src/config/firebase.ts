import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

const serviceAccount = require('../service-account-key.json');

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'gallery-admin-images'
});

export const db = getFirestore();
export const storage = getStorage(); 