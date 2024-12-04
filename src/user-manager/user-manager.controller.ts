import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserManagerService } from './user-manager.service';
import { CreateUserManagerDto } from './dto/create-user-manager.dto';
import { UpdateUserManagerDto } from './dto/update-user-manager.dto';

@Controller('user-manager')
export class UserManagerController {
  constructor(private readonly userManagerService: UserManagerService) {}

  @Post()
  create(@Body() createUserManagerDto: CreateUserManagerDto) {
    return this.userManagerService.create(createUserManagerDto);
  }

  @Get()
  findAll() {
    return this.userManagerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userManagerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserManagerDto: UpdateUserManagerDto,
  ) {
    return this.userManagerService.update(+id, updateUserManagerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userManagerService.remove(+id);
  }
}
