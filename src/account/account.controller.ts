import { Body, Controller, Get, Post } from '@nestjs/common';
import { Account } from '../appCore/entities/Account';
import { CreateAccountDTO } from './DTOs/CreateAccountDTO';
import { CurrentUser } from '../appCore/decorators/CurrentUser.decorator';
import { User } from '../appCore/entities/User';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  async create(
    @Body() createAccountDTO: CreateAccountDTO,
    @CurrentUser() user: User,
  ): Promise<Account> {
    return this.accountService.create(createAccountDTO, user);
  }

  @Get()
  async getAll(@CurrentUser() user: User): Promise<Account[]> {
    return this.accountService.getAll(user);
  }
}
