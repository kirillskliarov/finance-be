import { Module } from '@nestjs/common';
import { SplitService } from './split.service';
import { SplitController } from './split.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Split } from '../appCore/entities/Split';
import { SecurityModule } from '../security/security.module';

@Module({
  imports: [TypeOrmModule.forFeature([Split]), SecurityModule],
  exports: [TypeOrmModule],
  providers: [SplitService],
  controllers: [SplitController],
})
export class SplitModule {}
