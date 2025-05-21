import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAyLyfbWgwff5fcvRG3tFOWusSWRuta014",
    authDomain: "noreo-29850.firebaseapp.com",
    projectId: "noreo-29850",
    storageBucket: "noreo-29850.firebasestorage.app",
    messagingSenderId: "1061874166855",
    appId: "1:1061874166855:web:1da2b825a020227bdd9562",
    measurementId: "G-BG4TSWQMW0"
};



// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(firebase_app);
export default firebase_app;