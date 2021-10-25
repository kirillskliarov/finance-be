import { Body, Controller, Post } from '@nestjs/common';
import { SplitService } from './split.service';
import { CreateSecurityDTO } from '../security/DTOs/CreateSecurityDTO';
import { Security } from '../appCore/entities/Security';
import { CreateSplitDTO } from './DTOs/CreateSplitDTO';
import { Split } from '../appCore/entities/Split';

@Controller('split')
export class SplitController {
  constructor(private readonly splitService: SplitService) {}

  @Post()
  async create(@Body() createSplitDTO: CreateSplitDTO): Promise<Split> {
    return this.splitService.create(createSplitDTO);
  }
}
