import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity('logs')
export class LoggerEntity extends BaseEntity {
  @Column()
  timestamp: Date;

  @Column()
  level: string;

  @Column()
  message: string;

  @Column({ nullable: true })
  stack: string;
}
