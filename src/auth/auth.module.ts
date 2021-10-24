import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { SessionModule } from '../session/session.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/Local.strategy';
import { TokenStrategy } from './strategies/Token.strategy';

@Module({
  imports: [UserModule, SessionModule, PassportModule],
  providers: [AuthService, LocalStrategy, TokenStrategy],
})
export class AuthModule {}
