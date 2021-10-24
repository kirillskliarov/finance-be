import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, EntityManager, Repository } from 'typeorm';
import { User } from '../entities/User';
import { CreateUserDTO } from './DTOs/CreateUserDTO';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { Session } from '../entities/Session';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    private readonly connection: Connection,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      username,
    });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async login(user: User): Promise<Session> {
    const session = new Session();
    session.user = user;
    await this.connection.transaction(async (manager: EntityManager) => {
      await manager.save(session);
    });

    return session;
  }

  async create(createUserDTO: CreateUserDTO): Promise<Session> {
    const user: User = plainToClass(User, createUserDTO);
    user.hashedPassword = await bcrypt.hash(createUserDTO.password, 10);
    const session = new Session();
    session.user = user;
    await this.connection.transaction(async (manager: EntityManager) => {
      await manager.save(user);
      await manager.save(session);
    });

    return session;
  }
}
