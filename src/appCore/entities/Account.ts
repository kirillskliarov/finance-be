import { Exclude, Expose, Type } from 'class-transformer';
import {
  Column,
  Entity, Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn, Unique,
} from 'typeorm';
import { Broker } from './Broker';
import { User } from './User';
import { Deal } from './Deal';
import { InOut } from './InOut';
import { Tax } from './Tax';

@Entity()
@Unique('name_broker_user', ['name', 'broker', 'user'])
@Exclude()
export class Account {
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
  name: string;

  @ManyToOne(() => Broker, (broker: Broker) => broker.accounts, {
    nullable: false,
  })
  @Expose()
  @Type(() => Broker)
  broker: Broker;

  @ManyToOne(() => User, (user: User) => user.accounts, { nullable: false })
  user: User;

  @OneToMany(() => Deal, (deal: Deal) => deal.account)
  deals: Deal[];

  @OneToMany(() => InOut, (inOut: InOut) => inOut.account)
  inOuts: InOut[];

  @OneToMany(() => Tax, (tax: Tax) => tax.account)
  taxes: Tax[];
}
