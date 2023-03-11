import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { PostNotFoundException } from '../../exceptions/not-found';
import { BaseDto } from './base.dto';
import { BaseEntity } from './base.entity';
import { PageOptionsDto, Pagination } from './paginate';
import '../../q-builder.polyfill';

@Injectable()
export class BaseService<Entity extends BaseEntity<dto>, dto extends BaseDto> {
  protected queryBuilder: SelectQueryBuilder<Entity>
  constructor(
    @InjectRepository(BaseEntity)
    private baseRepository: Repository<Entity>,
  ) {
  }
  async softDelete(id: Uuid) {
    return await this.baseRepository.softDelete(id);
  }

  async getMany(pageOptions: PageOptionsDto): Promise<Pagination<Entity>> {
    const queryBuilder = this.baseRepository.createQueryBuilder();
    try {
      const [data, pageMetaDto] = await queryBuilder.paginate(pageOptions);

      return data.toPageDto(pageMetaDto);
    } catch (error) {
      throw new NotFoundException(HttpStatus.NOT_FOUND, 'not found');
    }
  }
  
  async createNotExist(values) : Promise<Entity| undefined> {
    const isFound = await this.baseRepository.findOneBy({ ...values })
    if(isFound) return undefined;
    const instance = this.baseRepository.create(values as Entity)
    return this.baseRepository.save(instance);
  }
  async findOneById(id: Uuid): Promise<Entity> {
    const queryBuilder = await this.baseRepository.findOneBy({ id: id as any });
    if (!queryBuilder) {
      throw new PostNotFoundException("Cannot found user");
    }
    return queryBuilder;
  }

  async updateInstanceById(id: Uuid, data: object) {
    this.baseRepository.update(id,data)
    return this.findOneById(id);
  }
}
