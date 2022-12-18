import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostNotFoundException } from '../../exceptions/not-found';
import { BaseEntity } from './base.entity';

@Injectable()
export class BaseService<Entity extends BaseEntity, dto> {
  constructor(
    @InjectRepository(BaseEntity)
    private baseRepository: Repository<Entity>,
  ) {}
  async softDelete(id: Uuid) {
    return await this.baseRepository.softDelete(id);
  }
  async findOneById(id: Uuid): Promise<Entity> {
    const queryBuilder = await this.baseRepository.findOneBy({ id: id as any });
    if (!queryBuilder) {
      throw new PostNotFoundException();
    }
    return queryBuilder;
  }
}
