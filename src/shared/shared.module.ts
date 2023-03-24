import { Global, Module } from '@nestjs/common';
import { AppConfigService } from './services/app-configs.service';
import { ValidatorService } from './services/validator.service';

const providers = [AppConfigService, ValidatorService];

@Module({
  providers,
  exports: [AppConfigService, ValidatorService],
})
@Global()
export class SharedModule {}
