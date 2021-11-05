import { Body, Controller, Post } from '@nestjs/common';
import { InOutService } from './in-out.service';
import { CreateAccountDTO } from '../appCore/DTOs/CreateAccountDTO';
import { CurrentUser } from '../appCore/decorators/CurrentUser.decorator';
import { User } from '../appCore/entities/User';
import { Account } from '../appCore/entities/Account';
import { InOut } from '../appCore/entities/InOut';
import { CreateInOutDTO } from '../appCore/DTOs/CreateInOutDTO';

@Controller('in-out')
export class InOutController {
  constructor(private readonly inOutService: InOutService) {}

  @Post()
  async create(
    @Body() createAccountDTO: CreateInOutDTO,
    @CurrentUser() user: User,
  ): Promise<InOut> {
    return this.inOutService.create(createAccountDTO, user);
  }
}
