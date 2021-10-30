import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Deal } from '../appCore/entities/Deal';
import { Repository } from 'typeorm';
import { CreateDealDTO } from './DTOs/CreateDealDTO';
import { User } from '../appCore/entities/User';
import { Account } from '../appCore/entities/Account';
import { Security } from '../appCore/entities/Security';
import { plainToClass } from 'class-transformer';
import { SecurityType } from '../appCore/entities/SecurityType';

@Injectable()
export class DealService {
  constructor(
    @InjectRepository(Deal)
    private readonly dealRepository: Repository<Deal>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Security)
    private readonly securityRepository: Repository<Security>,
  ) {}

  async create(createDealDTO: CreateDealDTO, user: User): Promise<Deal> {
    const account = await this.accountRepository.findOne({
      user,
      uuid: createDealDTO.accountUUID,
    });
    if (!account) {
      throw new HttpException(
        `Account UUID ${createDealDTO.accountUUID} not found`,
        400,
      );
    }
    const security = await this.securityRepository.findOne({
      uuid: createDealDTO.securityUUID,
    });
    if (!security) {
      throw new HttpException(
        `Security UUID ${createDealDTO.securityUUID} not found`,
        400,
      );
    }
    const currency = await this.securityRepository.findOne({
      where: {
        uuid: createDealDTO.currencyUUID,
        type: SecurityType.CURRENCY,
      },
    });
    if (!currency) {
      throw new HttpException(
        `Currency UUID ${createDealDTO.currencyUUID} not found`,
        400,
      );
    }
    const deal = plainToClass(Deal, createDealDTO);
    deal.account = account;
    deal.security = security;
    deal.currency = currency;

    return this.dealRepository.save(deal);
  }

  async find(user: User): Promise<Deal[]> {
    const accounts = await this.accountRepository.find({
      user,
    });

    if (accounts.length === 0) {
      return [];
    }

    return this.dealRepository.find({
      where: {
        account: accounts,
      },
      order: {
        dateTime: 'ASC',
      },
    });
  }
}
