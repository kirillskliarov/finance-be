import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from '../appCore/entities/Session';

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  exports: [TypeOrmModule, SessionService],
  providers: [SessionService],
})
export class SessionModule {}
