import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: 'dot-dev-review-interface.firebaseapp.com',
    databaseURL:
        'https://dot-dev-review-interface-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'dot-dev-review-interface',
    storageBucket: 'dot-dev-review-interface.appspot.com',
    messagingSenderId: '806370786839',
    appId: '1:806370786839:web:52ba730d5b476539e76652'
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
