import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Account } from '../appCore/entities/Account';
import { CreateAccountDTO } from './DTOs/CreateAccountDTO';
import { User } from '../appCore/entities/User';
import { Broker } from '../appCore/entities/Broker';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Broker)
    private readonly brokerRepository: Repository<Broker>,
  ) {}

  async create(
    createAccountDTO: CreateAccountDTO,
    user: User,
  ): Promise<Account> {
    const account: Account = plainToClass(Account, createAccountDTO);
    account.user = user;
    const broker = await this.brokerRepository.findOne({
      uuid: createAccountDTO.brokerUUID,
    });
    if (!broker) {
      throw new HttpException(
        `Broker UUID ${createAccountDTO.brokerUUID} not found`,
        400,
      );
    }
    account.broker = broker;
    return this.accountRepository.save(account);
  }
}
