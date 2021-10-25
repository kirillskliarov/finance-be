import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portfolio } from '../appCore/entities/Portfolio';

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio])],
  exports: [TypeOrmModule],
  controllers: [PortfolioController],
  providers: [PortfolioService],
})
export class PortfolioModule {}
