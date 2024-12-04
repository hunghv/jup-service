import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

import * as dotenv from 'dotenv';

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  } as ServiceAccount),
});

export const firebaseAuth = admin.auth();
