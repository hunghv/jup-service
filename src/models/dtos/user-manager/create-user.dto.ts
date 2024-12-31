import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { UserRole, AccountStatus } from '../../../shared/enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  @IsOptional()
  fullname: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '+1 123 456 7890',
    required: false,
  })
  @IsOptional()
  phone?: string;

  @ApiProperty({
    description: 'email of the user',
    example: 'hunghv2@gmail.com',
    required: true,
  })
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Primary address of the user',
    example: '123 Main St, Springfield',
    required: false,
  })
  @IsOptional()
  address1?: string;

  @ApiProperty({
    description: 'Secondary address of the user',
    example: 'Apt 4B, Springfield',
    required: false,
  })
  @IsOptional()
  address2?: string;

  @ApiProperty({
    description: 'Country of residence of the user',
    example: 'USA',
    required: false,
  })
  @IsOptional()
  country?: string;

  @ApiProperty({
    description: 'Date of birth of the user',
    example: '1990-01-01',
    required: false,
  })
  @IsOptional()
  dateOfBirth?: Date;

  @ApiProperty({
    description: "URL to the user's profile picture",
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  @IsOptional()
  profilePictureUrl?: string;

  @ApiProperty({
    description: 'Role of the user',
    enum: UserRole, // Assuming UserRole is an enum
  })
  @IsOptional()
  role: UserRole;

  @ApiProperty({
    description: 'Account status of the user',
    enum: AccountStatus, // Assuming AccountStatus is an enum
  })
  @IsOptional()
  accountStatus: AccountStatus;

  @ApiProperty({
    description: "User's Facebook profile URL",
    example: 'https://facebook.com/johndoe',
    required: false,
  })
  @IsOptional()
  facebookProfile?: string;

  @ApiProperty({
    description: "User's Twitter profile URL",
    example: 'https://twitter.com/johndoe',
    required: false,
  })
  @IsOptional()
  twitterProfile?: string;

  @ApiProperty({
    description: "User's LinkedIn profile URL",
    example: 'https://linkedin.com/in/johndoe',
    required: false,
  })
  @IsOptional()
  linkedinProfile?: string;

  @ApiProperty({
    description: 'Company the user works for',
    example: 'TechCorp',
    required: false,
  })
  @IsOptional()
  company?: string;

  @ApiProperty({
    description: 'Last login date of the user',
    example: '2024-12-01T10:00:00Z',
    required: false,
  })
  @IsOptional()
  lastLogin?: Date;

  @ApiProperty({
    description: 'City of the user',
    example: 'Springfield',
    required: false, // This matches @IsOptional() and @Column({ nullable: true })
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    description: 'State of the user',
    example: 'Illinois',
    required: false, // This matches @IsOptional() and @Column({ nullable: true })
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({
    description: 'Zip code of the user',
    example: '62701',
    required: false, // This matches @IsOptional() and @Column({ nullable: true })
  })
  @IsOptional()
  @IsString()
  zipCode?: string;

  @ApiProperty({
    description: 'Gender of the user',
    example: 'Male',
    required: false, // This matches @IsOptional() and @Column({ nullable: true })
  })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty({
    description: 'Occupation of the user',
    example: 'Software Engineer',
    required: false,
  })
  @IsOptional()
  occupation?: string;

  @ApiProperty({
    description: 'Short bio of the user',
    example: 'A passionate software developer with 5 years of experience.',
    required: false,
  })
  @IsOptional()
  bio?: string;
}
