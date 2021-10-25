import {
  Column,
  Entity, Generated,
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

  @Column()
  @Generated('uuid')
  @Expose({ toPlainOnly: true })
  uuid: string;

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
