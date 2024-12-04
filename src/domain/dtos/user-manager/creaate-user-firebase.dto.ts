import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ProviderDataDto {
  @ApiProperty({ example: 'password' })
  @IsOptional()
  providerId?: string;

  @ApiProperty({ example: 'hiqueneitruffa-1440@yopmail.com' })
  @IsOptional()
  uid?: string;

  @ApiProperty({ example: null })
  @IsOptional()
  displayName?: string | null;

  @ApiProperty({ example: 'hiqueneitruffa-1440@yopmail.com' })
  @IsOptional()
  email?: string;

  @ApiProperty({ example: null })
  @IsOptional()
  phoneNumber?: string | null;

  @ApiProperty({ example: null })
  @IsOptional()
  photoURL?: string | null;
}

export class StsTokenManagerDto {
  @ApiProperty({
    example: 'AMf-vByz-5ax8c38fWa.....',
  })
  @IsOptional()
  refreshToken?: string;

  @ApiProperty({
    example: 'eyJhbGciOiJSUzI1NiIsImtp.....',
  })
  @IsOptional()
  accessToken?: string;

  @ApiProperty({ example: 1732555102072 })
  @IsOptional()
  expirationTime?: number;
}

export class CreateUserFirebaseDto {
  @ApiProperty({ example: '265d' })
  @IsOptional()
  id?: string;

  @ApiProperty({ example: '6owxOU1f0NbfIT0kITxxOfppEs53' })
  @IsOptional()
  uid?: string;

  @ApiProperty({ example: 'hiqueneitruffa-1440@yopmail.com' })
  @IsOptional()
  email?: string;

  @ApiProperty({ example: false })
  @IsOptional()
  emailVerified?: boolean;

  @ApiProperty({ example: false })
  @IsOptional()
  isAnonymous?: boolean;

  @ApiProperty({ example: null })
  @IsOptional()
  displayName?: string | null;

  @ApiProperty({ type: [ProviderDataDto] })
  @IsOptional()
  providerData?: ProviderDataDto[];

  @ApiProperty({ type: StsTokenManagerDto })
  @IsOptional()
  stsTokenManager?: StsTokenManagerDto;

  @ApiProperty({ example: '1732551504304' })
  @IsOptional()
  createdAt?: string;

  @ApiProperty({ example: '1732551504304' })
  @IsOptional()
  lastLoginAt?: string;

  @ApiProperty({ example: 'AIzaSyC30-KJgvGKJD8pyxJALoiVu19IBPd7fKU' })
  @IsOptional()
  apiKey?: string;

  @ApiProperty({ example: '[DEFAULT]' })
  @IsOptional()
  appName?: string;
}
