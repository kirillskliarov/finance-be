import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { User } from './User';
import { Deal } from './Deal';
import { PortfolioTax } from './PortfolioTax';

@Entity()
@Unique('name_user', ['name', 'user'])
@Exclude()
export class Portfolio {
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
  name: string;

  @ManyToOne(() => User, (user: User) => user.accounts, { nullable: false })
  user: User;

  @OneToMany(() => Deal, (deal: Deal) => deal.portfolio)
  @Expose()
  deals: Deal[];

  @OneToMany(
    () => PortfolioTax,
    (portfolioTax: PortfolioTax) => portfolioTax.portfolio,
  )
  @Expose()
  portfolioTaxes: PortfolioTax[];
}
