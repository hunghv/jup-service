import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import { CreateUserFirebaseDto } from '../models/dtos/user-manager/creaate-user-firebase.dto';
import { CreateUserDto } from '../models/dtos/user-manager/create-user.dto';
import { UserService } from '../services/user.service';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { FirebaseAuthGuard } from 'src/utils/firebase-auth.guard';
import { Roles } from 'src/utils/roles.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-firebase')
  @Version('1')
  async createFirebaseUser(@Body() request: CreateUserFirebaseDto) {
    return this.userService.createFirebaseUser(request);
  }

  @Post('create')
  @Version('1')
  async createUser(@Body() request: CreateUserDto) {
    return this.userService.create(request);
  }

  @Get()
  @Version('1')
  @UseGuards(FirebaseAuthGuard)
  @Roles('admin')
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    description: 'Number of users per page',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    example: '{"createdAt":"DESC"}',
    description: 'Sorting order',
  })
  @ApiQuery({
    name: 'filter',
    required: false,
    example: '{"age":25}',
    description: 'Filter conditions',
  })
  @ApiResponse({ status: 200, description: 'List of users' })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sort') sort?: string,
    @Query('filter') filter?: string,
  ) {
    const data = await this.userService.findAll(+page, +limit, sort, filter);
    return {
      data: data.data,
      total: data.total,
      page: +page,
      limit: +limit,
    };
  }
}
