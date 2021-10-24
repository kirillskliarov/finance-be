import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Broker } from '../entities/Broker';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBrokerDTO } from './DTOs/CreateBrokerDTO';
import { plainToClass } from 'class-transformer';

@Injectable()
export class BrokerService {
  constructor(
    @InjectRepository(Broker)
    private readonly brokerRepository: Repository<Broker>,
  ) {}

  async create(createBrokerDTO: CreateBrokerDTO): Promise<Broker> {
    const broker: Broker = plainToClass(Broker, createBrokerDTO);
    debugger;
    const result = await this.brokerRepository.save(broker);
    debugger;
    return result;
  }
}
