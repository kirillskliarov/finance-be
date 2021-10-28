import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { DateTime } from 'luxon';
import { dateTimeSQLTransformer } from '../libs/DateTimeSQLTransformer';
import { Exclude, Expose, Transform } from 'class-transformer';
import { dateTimeTransformer } from '../libs/dateTimeTransformer';

@Entity()
@Exclude()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  @Expose({ toPlainOnly: true })
  uuid: string;

  @ManyToOne(() => User, (user: User) => user.sessions, {
    nullable: false,
  })
  @Expose()
  user: User;

  @Column({
    type: 'timestamptz',
    nullable: false,
    transformer: dateTimeSQLTransformer,
  })
  @Expose()
  @Transform(dateTimeTransformer)
  createdAt: DateTime;

  @Column({
    type: 'timestamptz',
    nullable: false,
    transformer: dateTimeSQLTransformer,
  })
  @Expose()
  @Transform(dateTimeTransformer)
  updatedAt: DateTime;

  @BeforeInsert()
  beforeInsert(): void {
    this.createdAt = DateTime.now();
    this.updatedAt = this.createdAt;
  }
}
