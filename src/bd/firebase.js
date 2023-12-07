// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Add this import for Firebase Storage

// Update this configuration with your own Firebase project details
const firebaseConfig = {
  apiKey: 'AIzaSyDdsfwQvZw1VYBmvIUqokT79bdOf87NE3Q',
  authDomain: 'teamup-bfe0d.firebaseapp.com',
  projectId: 'teamup-bfe0d',
  storageBucket: 'teamup-bfe0d.appspot.com',
  messagingSenderId: '708503680216',
  appId: '1:708503680216:web:421baa0d8e76e30fb5d3ad'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage

console.log('Firebase app initialized:', app);

export { auth, firestore, storage, app as firebase };

