import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDW1eDa7HlxVzLE2nHLsdO5Le19uPkIVOU",
  authDomain: "wedding-app-49201.firebaseapp.com",
  projectId: "wedding-app-49201",
  storageBucket: "wedding-app-49201.firebasestorage.app",
  messagingSenderId: "1023391558535",
  appId: "1:1023391558535:web:3fbb659a046da13e564122",
  measurementId: "G-486QL5GS77",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);