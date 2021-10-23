import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors
} from '@nestjs/common';
import { CreateUserDTO } from './DTOs/CreateUserDTO';
import { UserService } from './user.service';
import { User } from '../entities/User';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    debugger;
    return this.userService.create(createUserDTO);
  }
}
