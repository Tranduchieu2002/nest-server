import { AppConfigService } from '../../shared/services/app-configs.service';
import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';


@Module({
	providers: [CloudinaryService, AppConfigService, CloudinaryProvider],
	exports: [CloudinaryService],
})
export class CloudinaryModule {}