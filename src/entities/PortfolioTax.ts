import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Portfolio } from './Portfolio';
import { Tax } from './Tax';

@Entity()
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

  // TODO: add restriction (0 < portion && portion < 1)
  @Column({ nullable: false })
  portion: number;
}
