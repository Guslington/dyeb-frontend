import firebase from 'firebase/app';
import firebaseui from 'firebaseui';
import 'firebase/auth';
import 'firebase/firestore';
import config from './config';

const app = firebase.initializeApp(config);
const auth = firebase.auth();
const db = app.firestore();

const authUiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      customParameters: {
        prompt: 'select_account',
      },
    },
  ],
};

const authUi = new firebaseui.auth.AuthUI(auth);

export default app;
export { auth, authUi, authUiConfig, db };
