import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Version,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserFirebaseDto } from '../models/dtos/user-manager/creaate-user-firebase.dto';
import { CreateUserDto } from '../models/dtos/user-manager/create-user.dto';
import { UserService } from '../services/user.service';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Public, Roles } from '../utils/roles.decorator';
import { UpdateProfileDto } from '../models/dtos/user-manager/update-user.dto';
import { ResponseModel } from '../models/reponse/response.model';
import { RoleConstants } from '../shared/constants/role.constants';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-firebase')
  @Version('1')
  @Public()
  async createFirebaseUser(@Body() request: CreateUserFirebaseDto) {
    return this.userService.createFirebaseUser(request);
  }

  @Post('create')
  @Version('1')
  async createUser(@Body() request: CreateUserDto) {
    return this.userService.create(request);
  }

  @Post('update')
  @Version('1')
  async updateUser(@Body() request: UpdateProfileDto) {
    return this.userService.updateProfile(request);
  }

  @Get(':id')
  @Roles(RoleConstants.SYSTEMADMIN)
  @Version('1')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Get()
  @Version('1')
  @Roles(RoleConstants.SYSTEMADMIN)
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
    return ResponseModel.success({
      data: data.data,
      total: data.total,
      page: +page,
      limit: +limit,
    });
  }

  @Delete(':id')
  @Version('1')
  @Roles('admin')
  async remove(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
