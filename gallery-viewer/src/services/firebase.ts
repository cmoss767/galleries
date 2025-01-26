import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCnzsbDTErHEN_DJC34h9YS_8TXwyHZlkw",
  authDomain: "gallery-admin-project.firebaseapp.com",
  projectId: "gallery-admin-project",
  storageBucket: "gallery-admin-project.firebasestorage.app",
  messagingSenderId: "741473711322",
  appId: "1:741473711322:web:3f1538c7c47e58133161e3",
  measurementId: "G-X5DNGPWGL9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 