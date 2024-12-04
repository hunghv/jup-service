import { Column, Entity, OneToMany } from 'typeorm';

import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  IsOptional,
  IsDate,
  IsUrl,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Like } from './like.entity';
import { Comment } from './comment.entity';
import { Answer } from './answer.entity';
import { Question } from './question.entity';
import { Payment } from './payment.entity';
import { BaseEntity } from './base.entity';
import { UserRole, AccountStatus } from '../../shared/enum';
import { Course } from './course.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  @IsString()
  @IsNotEmpty({ message: 'Full name is required' })
  @Length(2, 30, { message: 'Full name must be between 2 and 30 characters' })
  fullname: string;

  @Column({ unique: true })
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @Column({ unique: true })
  @IsNotEmpty({ message: 'uuid is required' })
  uuid: string;

  @Column({ nullable: true })
  @IsOptional()
  phone?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(5, 100, { message: 'Address must be between 5 and 100 characters' })
  address1?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(5, 100, { message: 'Address must be between 5 and 100 characters' })
  address2?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  country?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateOfBirth?: Date;

  @Column({ nullable: true })
  @IsOptional()
  @IsUrl({}, { message: 'Invalid profile picture URL' })
  profilePictureUrl?: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.STUDENT })
  @IsEnum(UserRole, { message: 'Invalid user role' })
  role: UserRole;

  @Column({ type: 'enum', enum: AccountStatus, default: AccountStatus.ACTIVE })
  @IsEnum(AccountStatus, { message: 'Invalid account status' })
  accountStatus: AccountStatus;

  @Column({ nullable: true })
  @IsOptional()
  @IsUrl({}, { message: 'Invalid Facebook profile URL' })
  facebookProfile?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsUrl({}, { message: 'Invalid Twitter profile URL' })
  twitterProfile?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsUrl({}, { message: 'Invalid LinkedIn profile URL' })
  linkedinProfile?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  company?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsDate()
  lastLogin?: Date;

  @Column({ default: false })
  @IsOptional()
  isActive?: boolean;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  occupation?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  bio?: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  @IsOptional()
  comments?: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  @IsOptional()
  likes?: Like[];

  @OneToMany(() => Question, (question) => question.user)
  @IsOptional()
  questions?: Question[]; // Danh sách câu hỏi mà người dùng đã hỏi

  @OneToMany(() => Answer, (answer) => answer.user)
  @IsOptional()
  answers?: Answer[]; // Danh sách câu trả lời mà người dùng đã trả lời

  @OneToMany(() => Payment, (payment) => payment.user)
  @IsOptional()
  payments?: Payment[];

  @OneToMany(() => Course, (payment) => payment.instructor)
  @IsOptional()
  courses?: Course[];
}
