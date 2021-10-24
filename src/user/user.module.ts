import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { UserController } from './user.controller';
import { Session } from '../entities/Session';
import { LocalStrategy } from './strategies/Local.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User, Session])],
  exports: [TypeOrmModule],
  providers: [UserService, LocalStrategy],
  controllers: [UserController],
})
export class UserModule {}
