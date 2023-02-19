import { ConfigModule } from '@nestjs/config';
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

let app, auth;

export default async () => {
  await ConfigModule.envVariablesLoaded;

  const projectId = process.env.FIREBASE_PROJECTID;
  const privateKey = process.env.FIREBASE_PRIVATEKEY?.replace(/\\n/g, '\n');
  const clientEmail = process.env.FIREBASE_CLIENTEMAIL;

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
