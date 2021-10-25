import { Body, Controller, Post } from '@nestjs/common';
import { SecurityService } from './security.service';
import { Security } from '../appCore/entities/Security';
import { CreateSecurityDTO } from './DTOs/CreateSecurityDTO';

@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Post()
  async create(
    @Body() createSecurityDTO: CreateSecurityDTO,
  ): Promise<Security> {
    return this.securityService.create(createSecurityDTO);
  }
}
