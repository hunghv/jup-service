import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterData } from '../entities/masterdata.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MasterDataService {
  constructor(
    @InjectRepository(MasterData, 'app_db')
    private readonly masterDataRepository: Repository<MasterData>,
  ) {}

  async findAll(category: string): Promise<MasterData[]> {
    if (category == 'All') {
      return this.masterDataRepository.find();
    }
    return this.masterDataRepository.find({ where: { category } });
  }

  async create(
    key: string,
    value: string,
    category: string,
  ): Promise<MasterData> {
    const masterData = new MasterData();
    masterData.key = key;
    masterData.value = value;
    masterData.category = category;
    return this.masterDataRepository.save(masterData);
  }
}
