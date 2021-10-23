
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { CreateUserDTO } from './DTOs/CreateUserDTO';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const user: User = plainToClass(User, createUserDTO);
    user.hashedPassword = await bcrypt.hash(createUserDTO.password, 10);
    await this.userRepository.save(user);

    return user;
  }
}
