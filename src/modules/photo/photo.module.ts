import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoEntity } from './photo.entity';
import { PhotoService } from './photo.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([PhotoEntity]),
  ],
  exports: [PhotoService],
  providers: [PhotoService],
})
export class PhotoModule {}
