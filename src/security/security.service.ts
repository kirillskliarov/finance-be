import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Security } from '../appCore/entities/Security';
import { Repository } from 'typeorm';
import { CreateSecurityDTO } from './DTOs/CreateSecurityDTO';
import { plainToClass } from 'class-transformer';

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
}
