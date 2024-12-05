import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserFirebaseDto } from '../models/dtos/user-manager/creaate-user-firebase.dto';
import { CreateUserDto } from '../models/dtos/user-manager/create-user.dto';
import { UserService } from '../services/user.service';

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
