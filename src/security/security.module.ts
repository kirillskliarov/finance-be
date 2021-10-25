import { Module } from '@nestjs/common';
import { SecurityController } from './security.controller';
import { SecurityService } from './security.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Security } from '../appCore/entities/Security';

@Module({
  imports: [TypeOrmModule.forFeature([Security])],
  exports: [TypeOrmModule],
  controllers: [SecurityController],
  providers: [SecurityService],
})
export class SecurityModule {}
