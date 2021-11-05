import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SecurityService } from './security.service';
import { Security } from '../appCore/entities/Security';
import { CreateSecurityDTO } from '../appCore/DTOs/CreateSecurityDTO';
import { FindSecurityDTO } from '../appCore/DTOs/FindSecurityDTO';

@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Post()
  async create(
    @Body() createSecurityDTO: CreateSecurityDTO,
  ): Promise<Security> {
    return this.securityService.create(createSecurityDTO);
  }

  @Get()
  async find(@Query() findSecurityDTO: FindSecurityDTO): Promise<Security[]> {
    return this.securityService.find(findSecurityDTO);
  }
}
