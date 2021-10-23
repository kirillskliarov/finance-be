import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './Account';
import { Security } from './Security';
import { Portfolio } from './Portfolio';

@Entity()
export class Deal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  amount: number;

  @Column({
    nullable: false,
  })
  price: number;

  @Column({
    nullable: false,
  })
  brokerFee: number;

  @Column({
    nullable: false,
  })
  exchangeFee: number;

  @ManyToOne(() => Account, (account: Account) => account.deals, {
    nullable: false,
  })
  account: Account;

  @ManyToOne(() => Portfolio, (portfolio: Portfolio) => portfolio.deals, {
    nullable: false,
  })
  portfolio: Portfolio;

  @ManyToOne(() => Security, (security: Security) => security.deals, {
    nullable: false,
  })
  security: Security;

  getTotal(): number {
    return -(this.amount * this.price) - this.brokerFee - this.exchangeFee;
  }
}
