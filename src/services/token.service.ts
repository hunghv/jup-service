import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { firebaseAuth } from 'src/shared/configs/firebase-admin';

@Injectable({ scope: Scope.REQUEST })
export class TokenService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  async getToken(): Promise<DecodedIdToken | undefined> {
    const token = this.request['userToken'];
    const decodedToken = await firebaseAuth.verifyIdToken(token);
    return decodedToken;
  }
}
