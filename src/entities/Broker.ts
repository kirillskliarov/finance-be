import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Account } from './Account';

@Entity()
@Exclude()
export class Broker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  @Expose()
  name: string;

  @OneToMany(() => Account, (account: Account) => account.broker)
  accounts: Account[];
}
