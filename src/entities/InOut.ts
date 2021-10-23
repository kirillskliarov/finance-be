import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './Account';

@Entity()
export class InOut {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  amount: number;

  @ManyToOne(() => Account, (account: Account) => account.inOuts, {
    nullable: false,
  })
  account: Account;
}
