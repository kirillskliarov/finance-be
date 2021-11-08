import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Security } from '../appCore/entities/Security';
import { Repository } from 'typeorm';
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
    const queryBuilder = this.securityRepository
      .createQueryBuilder('security')
      .select(['uuid', 'secid', 'type'])
      .orderBy('security.type', 'ASC')
      .addOrderBy('security.secid', 'ASC');

    if (findSecurityDTO.secidLike) {
      queryBuilder.andWhere('security.secid ilike :secid', {
        secid: `%${findSecurityDTO.secidLike}%`,
      });
    }

    if (findSecurityDTO.type) {
      queryBuilder.andWhere('security.type = :type', {
        type: findSecurityDTO.type,
      });
    }

    return plainToClass(Security, <any[]>await queryBuilder.execute());
  }
}
