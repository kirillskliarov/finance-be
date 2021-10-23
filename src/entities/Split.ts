import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateTime } from 'luxon';
import { dateTimeSQLTransformer } from '../libs/DateTimeSQLTransformer';

@Entity()
export class Split {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'date',
    nullable: false,
    transformer: dateTimeSQLTransformer,
  })
  date: DateTime;

  @Column({
    nullable: false,
  })
  value: number;
}
