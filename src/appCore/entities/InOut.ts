import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './Account';
import { Exclude, Expose, Type } from 'class-transformer';

@Entity()
@Exclude()
export class InOut {
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

  @ManyToOne(() => Account, (account: Account) => account.inOuts, {
    nullable: false,
  })
  @Expose()
  @Type(() => Account)
  account: Account;
}
