import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../appCore/entities/User';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-http-bearer';

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(token: string): Promise<User> {
    const user = await this.authService.validateToken(token);
    if (user) {
      return user;
    }

    throw new UnauthorizedException();
  }
}
