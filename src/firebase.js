import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyD5ptRWFxZNyy1Z0hR_W-MSwseWhc2Oze8",
  authDomain: "doyouevenbrew.firebaseapp.com",
  databaseURL: "https://doyouevenbrew.firebaseio.com",
  projectId: "doyouevenbrew",
  storageBucket: "doyouevenbrew.appspot.com",
  messagingSenderId: "31324547985"
});

export default firebase;
