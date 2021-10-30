import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Account } from './Account';
import { Portfolio } from './Portfolio';
import { Session } from './Session';

@Entity()
@Exclude()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  @Expose({ toPlainOnly: true })
  uuid: string;

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

  @OneToMany(() => Session, (session: Session) => session.user)
  sessions: Session[];
}
