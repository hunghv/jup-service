import { Injectable } from '@nestjs/common';
import { CreateUserManagerDto } from './dto/create-user-manager.dto';
import { UpdateUserManagerDto } from './dto/update-user-manager.dto';

@Injectable()
export class UserManagerService {
  create(createUserManagerDto: CreateUserManagerDto) {
    return 'This action adds a new userManager';
  }

  findAll() {
    return `This action returns all userManager`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userManager`;
  }

  update(id: number, updateUserManagerDto: UpdateUserManagerDto) {
    return `This action updates a #${id} userManager`;
  }

  remove(id: number) {
    return `This action removes a #${id} userManager`;
  }
}
