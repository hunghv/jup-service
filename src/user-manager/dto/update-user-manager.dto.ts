import { PartialType } from '@nestjs/swagger';
import { CreateUserManagerDto } from './create-user-manager.dto';

export class UpdateUserManagerDto extends PartialType(CreateUserManagerDto) {}
