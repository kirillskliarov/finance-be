import { Body, Controller, Get, Post } from '@nestjs/common';
import { SplitService } from './split.service';
import { CreateSplitDTO } from '../appCore/DTOs/CreateSplitDTO';
import { Split } from '../appCore/entities/Split';

@Controller('split')
export class SplitController {
  constructor(private readonly splitService: SplitService) {}

  @Post()
  async create(@Body() createSplitDTO: CreateSplitDTO): Promise<Split> {
    return this.splitService.create(createSplitDTO);
  }

  @Get()
  async getAll(): Promise<Split[]> {
    return this.splitService.getAll();
  }
}
