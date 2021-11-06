import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Deal } from '../appCore/entities/Deal';
import { In, Repository } from 'typeorm';
import { CreateDealDTO } from '../appCore/DTOs/CreateDealDTO';
import { User } from '../appCore/entities/User';
import { Account } from '../appCore/entities/Account';
import { Security } from '../appCore/entities/Security';
import { plainToClass } from 'class-transformer';
import { SecurityType } from '../appCore/entities/SecurityType';
import { Portfolio } from '../appCore/entities/Portfolio';

@Injectable()
export class DealService {
  constructor(
    @InjectRepository(Deal)
    private readonly dealRepository: Repository<Deal>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
    @InjectRepository(Security)
    private readonly securityRepository: Repository<Security>,
  ) {}

  async create(createDealDTO: CreateDealDTO, user: User): Promise<Deal> {
    const account = await this.accountRepository.findOne({
      user,
      uuid: createDealDTO.account.uuid,
    });
    if (!account) {
      throw new HttpException(
        `Account UUID ${createDealDTO.account.uuid} not found`,
        400,
      );
    }
    const portfolio = await this.portfolioRepository.findOne({
      user,
      uuid: createDealDTO.portfolio.uuid,
    });
    if (!portfolio) {
      throw new HttpException(
        `Portfolio UUID ${createDealDTO.portfolio.uuid} not found`,
        400,
      );
    }
    const security = await this.securityRepository.findOne({
      uuid: createDealDTO.security.uuid,
    });
    if (!security) {
      throw new HttpException(
        `Security UUID ${createDealDTO.security.uuid} not found`,
        400,
      );
    }
    const currency = await this.securityRepository.findOne({
      where: {
        uuid: createDealDTO.currency.uuid,
        type: SecurityType.CURRENCY,
      },
    });
    if (!currency) {
      throw new HttpException(
        `Currency UUID ${createDealDTO.currency.uuid} not found`,
        400,
      );
    }
    const deal = plainToClass(Deal, createDealDTO);
    deal.account = account;
    deal.security = security;
    deal.currency = currency;
    deal.portfolio = portfolio;

    return this.dealRepository.save(deal);
  }

  async find(user: User): Promise<Deal[]> {
    const accounts = await this.accountRepository.find({
      where: {
        user,
      },
    });

    if (accounts.length === 0) {
      return [];
    }

    return this.dealRepository.find({
      where: {
        account: In(accounts.map((account: Account) => account.id)),
      },
      relations: ['account', 'portfolio', 'security', 'currency'],
      order: {
        dateTime: 'ASC',
      },
    });
  }
}
