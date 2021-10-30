import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './Account';
import { Security } from './Security';
import { Portfolio } from './Portfolio';
import { Exclude, Expose, Transform } from 'class-transformer';
import { dateTimeSQLTransformer } from '../libs/DateTimeSQLTransformer';
import { dateTimeTransformer } from '../libs/dateTimeTransformer';
import { DateTime } from 'luxon';

@Entity()
@Exclude()
export class Deal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  @Expose({ toPlainOnly: true })
  uuid: string;

  @Column({
    type: 'timestamptz',
    nullable: false,
    transformer: dateTimeSQLTransformer,
  })
  @Expose()
  @Transform(dateTimeTransformer)
  dateTime: DateTime;

  @Column({
    nullable: false,
  })
  @Expose()
  amount: number;

  @Column({
    nullable: false,
  })
  @Expose()
  price: number;

  @Column({
    nullable: false,
  })
  @Expose()
  brokerFee: number;

  @Column({
    nullable: false,
  })
  @Expose()
  exchangeFee: number;

  @ManyToOne(() => Account, (account: Account) => account.deals, {
    nullable: false,
  })
  account: Account;

  @ManyToOne(() => Portfolio, (portfolio: Portfolio) => portfolio.deals, {
    nullable: false,
  })
  portfolio: Portfolio;

  @ManyToOne(() => Security, (security: Security) => security.incomeDeals, {
    nullable: false,
  })
  security: Security;

  @ManyToOne(() => Security, (security: Security) => security.outcomeDeals, {
    nullable: false,
  })
  currency: Security;

  getTotal(): number {
    return -(this.amount * this.price) - this.brokerFee - this.exchangeFee;
  }
}
