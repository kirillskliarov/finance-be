import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Split } from '../appCore/entities/Split';
import { Repository } from 'typeorm';
import { CreateSplitDTO } from '../appCore/DTOs/CreateSplitDTO';
import { Security } from '../appCore/entities/Security';
import { plainToClass } from 'class-transformer';

@Injectable()
export class SplitService {
  constructor(
    @InjectRepository(Split)
    private readonly splitRepository: Repository<Split>,
    @InjectRepository(Security)
    private readonly securityRepository: Repository<Security>,
  ) {}

  async create(createSplitDTO: CreateSplitDTO): Promise<Split> {
    const security = await this.securityRepository.findOne({
      uuid: createSplitDTO.security.uuid,
    });

    if (!security) {
      throw new HttpException(
        `Security UUID ${createSplitDTO.security.uuid} not found`,
        400,
      );
    }

    const split = plainToClass(Split, createSplitDTO);
    split.security = security;

    return this.splitRepository.save(split);
  }

  async getAll(): Promise<Split[]> {
    return this.splitRepository.find({
      relations: ['security'],
    });
  }
}
