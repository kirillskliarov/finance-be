import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Deal } from './Deal';
import { Exclude, Expose } from 'class-transformer';

@Entity()
@Exclude()
export class Security {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  @Expose()
  secId: string;

  @OneToMany(() => Deal, (deal: Deal) => deal.security)
  deals: Deal[];
}
