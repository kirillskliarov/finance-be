import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Portfolio } from '../appCore/entities/Portfolio';
import { CreatePortfolioDTO } from './DTOs/CreatePortfolioDTO';
import { plainToClass } from 'class-transformer';
import { User } from '../appCore/entities/User';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
  ) {}

  async create(
    createPortfolioDTO: CreatePortfolioDTO,
    user: User,
  ): Promise<Portfolio> {
    const portfolio = plainToClass(Portfolio, createPortfolioDTO);
    portfolio.user = user;
    return this.portfolioRepository.save(portfolio);
  }
}
