import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose, Transform } from 'class-transformer';
import { Account } from './Account';
import { Portfolio } from './Portfolio';

@Entity()
@Exclude()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  @Expose()
  username: string;

  @Column({
    nullable: false,
  })
  hashedPassword: string;

  @OneToMany(() => Account, (account: Account) => account.user)
  accounts: Account[];

  @OneToMany(() => Portfolio, (portfolio: Portfolio) => portfolio.user)
  portfolios: Portfolio[];
}
