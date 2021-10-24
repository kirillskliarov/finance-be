import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from './DTOs/CreateUserDTO';
import { UserService } from './user.service';
import { Session } from '../entities/Session';
import { User } from '../entities/User';
import { CurrentUser } from '../decorators/CurrentUser.decorator';
import { PasswordAuthGuard } from '../auth/guards/password-auth.guard';
import { Public } from '../decorators/Public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @UseGuards(PasswordAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: User): Promise<Session> {
    return this.userService.login(user);
  }

  @Public()
  @Post()
  async create(@Body() createUserDTO: CreateUserDTO): Promise<Session> {
    return await this.userService.create(createUserDTO);
  }
}
