import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../appCore/entities/Account';
import { BrokerModule } from '../broker/broker.module';

@Module({
  imports: [TypeOrmModule.forFeature([Account]), BrokerModule],
  exports: [TypeOrmModule],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
