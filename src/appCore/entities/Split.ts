import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateTime } from 'luxon';
import { dateTimeSQLTransformer } from '../libs/DateTimeSQLTransformer';
import { Exclude, Expose, Transform } from 'class-transformer';
import { Security } from './Security';
import { dateTimeTransformer } from '../libs/dateTimeTransformer';

@Entity()
@Exclude()
export class Split {
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
  value: number;

  @ManyToOne(() => Security, (security: Security) => security.splits)
  @Expose()
  security: Security;
}
