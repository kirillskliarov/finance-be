import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Security } from '../appCore/entities/Security';
import { ILike, Like, Repository } from 'typeorm';
import { CreateSecurityDTO } from '../appCore/DTOs/CreateSecurityDTO';
import { plainToClass } from 'class-transformer';
import { FindSecurityDTO } from '../appCore/DTOs/FindSecurityDTO';

@Injectable()
export class SecurityService {
  constructor(
    @InjectRepository(Security)
    private readonly securityRepository: Repository<Security>,
  ) {}

  async create(createSecurityDTO: CreateSecurityDTO): Promise<Security> {
    const security = plainToClass(Security, createSecurityDTO);
    return this.securityRepository.save(security);
  }

  async find(findSecurityDTO: FindSecurityDTO): Promise<Security[]> {
    const where: Record<string, any> = {};
    for (const key in findSecurityDTO) {
      switch (key) {
        case 'secidLike': {
          const value = findSecurityDTO['secidLike'];
          where.secid = ILike(`%${value}%`);
          break;
        }
        case 'type': {
          where.type = findSecurityDTO['type'];
          break;
        }
      }
    }
    return this.securityRepository.find({
      where: where,
    });
  }
}
