import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('email_templates')
export class EmailTemplate extends BaseEntity {
  @Column()
  name: string;

  @Column()
  subject: string;

  @Column('text')
  content: string;
}
