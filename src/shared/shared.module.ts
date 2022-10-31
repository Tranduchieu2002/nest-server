import { Global, Module } from '@nestjs/common';
import { AppConfigService } from './services/app-configs.service';

const providers = [AppConfigService];

@Module({
  providers,
  exports: [AppConfigService],
})
@Global()
export class SharedModule {}
