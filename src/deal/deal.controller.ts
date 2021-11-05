import { Body, Controller, Post } from '@nestjs/common';
import { DealService } from './deal.service';
import { CurrentUser } from '../appCore/decorators/CurrentUser.decorator';
import { User } from '../appCore/entities/User';
import { Deal } from '../appCore/entities/Deal';
import { CreateDealDTO } from '../appCore/DTOs/CreateDealDTO';

@Controller('deal')
export class DealController {
  constructor(private readonly dealService: DealService) {}

  @Post()
  async create(
    @Body() createDealDTO: CreateDealDTO,
    @CurrentUser() user: User,
  ): Promise<Deal> {
    return this.dealService.create(createDealDTO, user);
  }
}
