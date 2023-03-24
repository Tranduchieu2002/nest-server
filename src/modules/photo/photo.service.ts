import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../base/base.service';
import { PhotoEntity } from './photo.entity';

export class PhotoService extends BaseService<PhotoEntity, any> {
  constructor(
    @InjectRepository(PhotoEntity)
    private readonly photoRepository: Repository<PhotoEntity>,
  ) {
    super(photoRepository);
  }
  async updatePhoto(data: object): Promise<PhotoEntity> {
    const photo = this.photoRepository.create(data);
    return this.photoRepository.save(photo);
  }
}
