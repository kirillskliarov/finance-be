import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../entities/User';
import * as bcrypt from 'bcrypt';
import { SessionService } from '../session/session.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.hashedPassword))) {
      return user;
    }
    return null;
  }

  async validateToken(token: string): Promise<User | null> {
    const session = await this.sessionService.find(token);
    return session?.user ?? null;
  }
}
