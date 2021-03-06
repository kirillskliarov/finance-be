import { Module } from '@nestjs/common';
import { DealController } from './deal.controller';
import { DealService } from './deal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deal } from '../appCore/entities/Deal';
import { AccountModule } from '../account/account.module';
import { SecurityModule } from '../security/security.module';
import { PortfolioModule } from '../portfolio/portfolio.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Deal]),
    AccountModule,
    SecurityModule,
    PortfolioModule,
  ],
  exports: [TypeOrmModule],
  controllers: [DealController],
  providers: [DealService],
})
export class DealModule {}
