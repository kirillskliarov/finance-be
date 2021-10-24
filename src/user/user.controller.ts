import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post, Req, UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { CreateUserDTO } from './DTOs/CreateUserDTO';
import { UserService } from './user.service';
import { Session } from '../entities/Session';
import { User } from '../entities/User';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../decorators/CurrentUser.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@CurrentUser() user: User): Promise<Session> {
    return this.userService.login(user);
  }

  @Post()
  async create(@Body() createUserDTO: CreateUserDTO): Promise<Session> {
    return this.userService.create(createUserDTO);
  }
}
