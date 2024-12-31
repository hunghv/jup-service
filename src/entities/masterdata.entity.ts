import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('masterdata')
export class MasterData extends BaseEntity {
  @Column()
  key: string;

  @Column()
  value: string;

  @Column({ nullable: true })
  category: string;
}
