import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './Account';

@Entity()
@Exclude()
export class Broker {
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
  name: string;

  @OneToMany(() => Account, (account: Account) => account.broker)
  accounts: Account[];
}
