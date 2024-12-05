import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateUserFirebaseDto } from 'src/models/dtos/user-manager/creaate-user-firebase.dto';
import { CreateUserDto } from 'src/models/dtos/user-manager/create-user.dto';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-firebase')
  async createFirebaseUser(@Body() request: CreateUserFirebaseDto) {
    return this.userService.createFirebaseUser(request);
  }

  @Post('create')
  async createUser(@Body() request: CreateUserDto) {
    return this.userService.create(request);
  }

  // @Get(':id')
  // async getUser(@Param('id') id: string) {
  //   return this.queryBus.execute(new GetUserQuery(id));
  // }
}
