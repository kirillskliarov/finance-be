import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Deal } from './Deal';
import { Exclude, Expose, Type } from 'class-transformer';
import { Split } from './Split';
import { SecurityType } from './SecurityType';

@Entity()
@Exclude()
export class Security {
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
  secid: string;

  @Column({
    type: 'enum',
    enum: SecurityType,
    default: SecurityType.ETF,
    nullable: false,
  })
  @Expose()
  type: SecurityType;

  @OneToMany(() => Deal, (deal: Deal) => deal.security)
  incomeDeals: Deal[];

  @OneToMany(() => Deal, (deal: Deal) => deal.currency)
  outcomeDeals: Deal[];

  @OneToMany(() => Split, (split: Split) => split.security)
  splits: Split[];
}
