import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging/sw';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyBPkYe5rzjupkGGyCycVUms3df_UdqugS4',
    authDomain: 'rjc-app.firebaseapp.com',
    projectId: 'rjc-app',
    storageBucket: 'rjc-app.appspot.com',
    messagingSenderId: '413998419418',
    appId: '1:413998419418:web:04af33ddab2c7690b184e3',
    measurementId: 'G-H0C0VF2R9E',
};

export const app = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider();
export const messaging = getMessaging(app);
export const auth = getAuth(app);
