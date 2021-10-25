import { Module } from '@nestjs/common';
import { BrokerController } from './broker.controller';
import { BrokerService } from './broker.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Broker } from '../appCore/entities/Broker';

@Module({
  imports: [TypeOrmModule.forFeature([Broker])],
  exports: [TypeOrmModule],
  controllers: [BrokerController],
  providers: [BrokerService],
})
export class BrokerModule {}
