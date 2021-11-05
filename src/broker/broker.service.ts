import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Broker } from '../appCore/entities/Broker';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBrokerDTO } from '../appCore/DTOs/CreateBrokerDTO';
import { plainToClass } from 'class-transformer';

@Injectable()
export class BrokerService {
  constructor(
    @InjectRepository(Broker)
    private readonly brokerRepository: Repository<Broker>,
  ) {}

  async create(createBrokerDTO: CreateBrokerDTO): Promise<Broker> {
    const broker: Broker = plainToClass(Broker, createBrokerDTO);
    return this.brokerRepository.save(broker);
  }

  async getAll(): Promise<Broker[]> {
    return this.brokerRepository.find();
  }
}
