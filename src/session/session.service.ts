import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from '../appCore/entities/Session';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async find(uuid: string): Promise<Session | undefined> {
    return this.sessionRepository.findOne({ uuid }, { relations: ['user'] });
  }
}
