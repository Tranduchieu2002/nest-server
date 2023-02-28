import { ConfigOptions, v2 } from "cloudinary";
import { CLOUDINARY } from "@server/constants";
import { AppConfigService } from "../../shared/services/app-configs.service";
export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (configService: AppConfigService): ConfigOptions => {
    return v2.config(configService.getCloudinaryConfig());
  },
  inject: [AppConfigService]
};