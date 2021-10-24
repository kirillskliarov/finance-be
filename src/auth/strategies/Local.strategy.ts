import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../appCore/entities/User';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(username, password);
    if (user) {
      return user;
    }

    throw new UnauthorizedException();
  }
}
