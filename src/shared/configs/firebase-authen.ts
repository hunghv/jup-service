import { initializeApp } from 'firebase/app';

import * as dotenv from 'dotenv';

dotenv.config();

const firebase = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
});

export const firebaseApp = firebase;
