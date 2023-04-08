import { ConfigModule } from '@nestjs/config';
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import * as dotenv from 'dotenv';
dotenv.config();

let app, auth;

export default async () => {
  await ConfigModule.envVariablesLoaded;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

  if (!app) {
    app = initializeApp({
      credential: cert({ projectId, clientEmail, privateKey })
    });
  }
  if (!auth) {
    auth = getAuth();
  }
  return auth;
};
