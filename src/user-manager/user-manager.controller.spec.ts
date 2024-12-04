import { Test, TestingModule } from '@nestjs/testing';
import { UserManagerController } from './user-manager.controller';
import { UserManagerService } from './user-manager.service';

describe('UserManagerController', () => {
  let controller: UserManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserManagerController],
      providers: [UserManagerService],
    }).compile();

    controller = module.get<UserManagerController>(UserManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
