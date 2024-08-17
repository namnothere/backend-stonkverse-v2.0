import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../providers';
import { STRATEGY_LOCAL } from '../constants';
import { UserAccessTokenClaims } from '../dtos';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, STRATEGY_LOCAL) {
  constructor(private auth: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
      // passReqToCallback: true,
    });
  }

  public async validate(username: string, password: string): Promise<UserAccessTokenClaims> {
    return this.auth.validateUser(username, password);
  }
}
