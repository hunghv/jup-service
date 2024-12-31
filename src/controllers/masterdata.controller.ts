import { Controller, Get, Post, Body, Param, Version } from '@nestjs/common';
import { MasterDataService } from '../services/masterdata.service';
import { ApiQuery } from '@nestjs/swagger';
import { RoleConstants } from 'src/shared/constants/role.constants';
import { Roles } from 'src/utils/roles.decorator';
import { ResponseModel } from 'src/models/reponse/response.model';

@Controller('master-data')
export class MasterDataController {
  constructor(private readonly masterDataService: MasterDataService) {}

  @Get(':category')
  @Version('1')
  @Roles(RoleConstants.SYSTEMADMIN)
  @ApiQuery({
    name: 'category',
    required: false,
    example: 'gender',
    description: 'master data',
  })
  async getMasterData(@Param('category') category: string) {
    return ResponseModel.success(this.masterDataService.findAll(category));
  }

  @Post()
  @Version('1')
  @Roles(RoleConstants.SYSTEMADMIN)
  @ApiQuery({
    name: 'category',
    required: false,
    example: 'gender',
    description: 'master data',
  })
  @ApiQuery({
    name: 'key',
    required: false,
    example: 'US',
    description: 'key of master data',
  })
  @ApiQuery({
    name: 'value',
    required: false,
    example: 'Mỹ',
    description: 'value of master data',
  })
  async createMasterData(
    @Body('key') key: string,
    @Body('value') value: string,
    @Body('category') category: string,
  ) {
    return this.masterDataService.create(key, value, category);
  }
}
