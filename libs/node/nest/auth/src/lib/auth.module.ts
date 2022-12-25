import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseConstants, FirebaseModule } from '@mussia14/firebase-admin';
import { FirebaseAuthStrategy } from './firebase-auth.strategy';
import {credential, ServiceAccount} from 'firebase-admin';

@Module({
  imports: [
    FirebaseModule.forRoot({
      credential: credential.cert({
        private_key: process.env.FIREBASE_PRIVATE_KEY, // todo enum from those envs
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        project_id: process.env.PROJECT_ID,
      } as Partial<ServiceAccount>),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    }),
    PassportModule.register({
      defaultStrategy: FirebaseConstants.FIREBASE_AUTH_GUARD,
    }),
  ],
  providers: [FirebaseAuthStrategy],
})
export class AuthModule {}
