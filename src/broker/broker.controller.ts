import { Body, Controller, Get, Post } from '@nestjs/common';
import { BrokerService } from './broker.service';
import { Broker } from '../appCore/entities/Broker';
import { CreateBrokerDTO } from './DTOs/CreateBrokerDTO';

@Controller('broker')
export class BrokerController {
  constructor(private readonly brokerService: BrokerService) {}

  @Post()
  async create(@Body() createBrokerDTO: CreateBrokerDTO): Promise<Broker> {
    return this.brokerService.create(createBrokerDTO);
  }

  @Get()
  async getAll(): Promise<Broker[]> {
    return this.brokerService.getAll();
  }
}
