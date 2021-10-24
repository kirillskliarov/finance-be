import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './Account';
import { Exclude, Expose } from 'class-transformer';

@Entity()
@Exclude()
export class InOut {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  @Expose()
  amount: number;

  @ManyToOne(() => Account, (account: Account) => account.inOuts, {
    nullable: false,
  })
  @Expose()
  account: Account;
}
