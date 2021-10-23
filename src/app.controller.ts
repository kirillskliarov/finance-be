import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/User';
import { Repository } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  @Get()
  getHello(): string {
    const user: User = this.userRepository.create({
      username: 'k2',
    });
    debugger;

    this.userRepository.save(user);
    debugger;
    const databaseType = this.configService.get<string>('');
    console.log(databaseType);
    return this.appService.getHello();
  }
}
