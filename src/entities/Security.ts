import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Deal } from './Deal';

@Entity()
export class Security {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  secId: string;

  @OneToMany(() => Deal, (deal: Deal) => deal.security)
  deals: Deal[];
}
