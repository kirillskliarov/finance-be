import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user.service';
import { User } from '../../entities/User';
import * as bcrypt from 'bcrypt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user: User | undefined = await this.userService.findByUsername(
      username,
    );
    if (user && (await bcrypt.compare(password, user.hashedPassword))) {
      return user;
    }

    throw new UnauthorizedException();
  }
}
