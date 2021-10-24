import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../appCore/entities/User';
import { UserController } from './user.controller';
import { Session } from '../appCore/entities/Session';

@Module({
  imports: [TypeOrmModule.forFeature([User, Session])],
  exports: [TypeOrmModule, UserService],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
