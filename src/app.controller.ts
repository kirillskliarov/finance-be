import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './appCore/entities/User';
import { Repository } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './appCore/decorators/CurrentUser.decorator';
import { Public } from './appCore/decorators/Public.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  @Public()
  @Get()
  getHello(@CurrentUser() user: User): string {
    debugger;
    return this.appService.getHello();
  }

  @Get('data')
  getData(@CurrentUser() user: User): string {
    return this.appService.getData();
  }
}
