import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Deal } from './Deal';
import { Exclude, Expose } from 'class-transformer';
import { Split } from './Split';

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

  @OneToMany(() => Deal, (deal: Deal) => deal.security)
  deals: Deal[];

  @OneToMany(() => Split, (split: Split) => split.security)
  splits: Split[];
}
