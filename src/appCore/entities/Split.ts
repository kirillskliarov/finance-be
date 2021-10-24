import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateTime } from 'luxon';
import { dateTimeSQLTransformer } from '../appCore/libs/DateTimeSQLTransformer';
import { Exclude, Expose, Transform } from 'class-transformer';
import { DateTimeClassTransformer } from '../appCore/libs/DateTimeClassTransformer';

@Entity()
@Exclude()
export class Split {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'date',
    nullable: false,
    transformer: dateTimeSQLTransformer,
  })
  @Expose()
  @Transform(DateTimeClassTransformer.toPlain, { toPlainOnly: true })
  date: DateTime;

  @Column({
    nullable: false,
  })
  @Expose()
  value: number;
}
