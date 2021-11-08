import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CurrentUser } from '../appCore/decorators/CurrentUser.decorator';
import { User } from '../appCore/entities/User';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDTO } from '../appCore/DTOs/CreatePortfolioDTO';
import { Portfolio } from '../appCore/entities/Portfolio';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  async create(
    @Body() createPortfolioDTO: CreatePortfolioDTO,
    @CurrentUser() user: User,
  ): Promise<Portfolio> {
    return this.portfolioService.create(createPortfolioDTO, user);
  }

  @Get()
  async getAll(@CurrentUser() user: User): Promise<Portfolio[]> {
    return this.portfolioService.getAll(user);
  }

  @Get(':uuid')
  async getByUUID(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @CurrentUser() user: User,
  ): Promise<Portfolio> {
    return this.portfolioService.getByUUID(uuid, user);
  }
}
