import { Module } from '@nestjs/common';
import { InOutController } from './in-out.controller';
import { InOutService } from './in-out.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InOut } from '../appCore/entities/InOut';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [TypeOrmModule.forFeature([InOut]), AccountModule],
  exports: [TypeOrmModule],
  controllers: [InOutController],
  providers: [InOutService],
})
export class InOutModule {}
