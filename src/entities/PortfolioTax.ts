import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Portfolio } from './Portfolio';
import { Tax } from './Tax';
import { Exclude, Expose } from 'class-transformer';

@Entity()
@Exclude()
export class PortfolioTax {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Portfolio,
    (portfolio: Portfolio) => portfolio.portfolioTaxes,
    { nullable: false },
  )
  portfolio: Portfolio;

  @ManyToOne(() => Tax, (tax: Tax) => tax.portfolioTaxes, { nullable: false })
  tax: Tax;

  // TODO: think about: percentage or absolute value?
  @Column({ nullable: false })
  @Expose()
  portion: number;
}
