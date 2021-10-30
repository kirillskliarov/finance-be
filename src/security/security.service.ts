import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Security } from '../appCore/entities/Security';
import { Repository } from 'typeorm';
import { CreateSecurityDTO } from './DTOs/CreateSecurityDTO';
import { plainToClass } from 'class-transformer';
import { FindSecurityDTO } from './DTOs/FindSecurityDTO';

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
    return this.securityRepository.find({
      where: {
        secid: findSecurityDTO.secid,
      },
    });
  }
}
