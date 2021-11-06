import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InOut } from '../appCore/entities/InOut';
import { Repository } from 'typeorm';
import { CreateInOutDTO } from '../appCore/DTOs/CreateInOutDTO';
import { User } from '../appCore/entities/User';
import { Account } from '../appCore/entities/Account';
import { plainToClass } from 'class-transformer';

@Injectable()
export class InOutService {
  constructor(
    @InjectRepository(InOut)
    private readonly inOutRepository: Repository<InOut>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async create(createInOutDTO: CreateInOutDTO, user: User): Promise<InOut> {
    const account: Account | undefined = await this.accountRepository.findOne({
      user,
      uuid: createInOutDTO.account.uuid,
    });

    if (!account) {
      throw new HttpException(
        `Account UUID ${createInOutDTO.account.uuid} not found`,
        400,
      );
    }

    const inOut = plainToClass(InOut, createInOutDTO);
    inOut.account = account;
    return this.inOutRepository.save(inOut);
  }
}
