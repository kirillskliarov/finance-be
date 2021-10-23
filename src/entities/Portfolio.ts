import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { User } from './User';
import { Deal } from './Deal';
import { PortfolioTax } from './PortfolioTax';

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  @Expose()
  name: string;

  @ManyToOne(() => User, (user: User) => user.accounts, { nullable: false })
  user: User;

  @OneToMany(() => Deal, (deal: Deal) => deal.portfolio)
  deals: Deal[];

  @OneToMany(
    () => PortfolioTax,
    (portfolioTax: PortfolioTax) => portfolioTax.portfolio,
  )
  portfolioTaxes: PortfolioTax[];
}
