import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './Account';
import { PortfolioTax } from './PortfolioTax';
import { Exclude, Expose } from 'class-transformer';

@Entity()
@Exclude()
export class Tax {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  @Expose()
  amount: number;

  @ManyToOne(() => Account, (account: Account) => account.taxes, {
    nullable: false,
  })
  account: Account;

  @OneToMany(() => PortfolioTax, (pt: PortfolioTax) => pt.tax)
  portfolioTaxes: PortfolioTax[];
}
