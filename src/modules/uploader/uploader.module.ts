import { DynamicModule, Module } from "@nestjs/common";
import { CloudinaryModule } from "../cloud-dinary/cloudinary.module";
import { CloudinaryService } from "../cloud-dinary/cloudinary.service";
import { SharedModule } from "../../shared/shared.module";
import { UploaderController } from "./uploader.controller";
import { UploaderService } from "./uploader.service";

export interface IShareUploadConfigs {
  folder: string;
  format?: string;
  resource_type?: "image" | "video" | "raw" | "auto";
}

const shareConfigsUpload: IShareUploadConfigs = {
  folder: 'upload-test',
  format: 'jpg',
  resource_type: "image",
  // some config to cloud
}

export const UploadConfigsProvider = 'UPLOAD_CONFIGS_PROVIDER'

export class UploaderModule {
  static register(data?: IShareUploadConfigs): DynamicModule {
    return {
      module: UploaderModule,
      providers: [UploaderService, {
        provide: UploadConfigsProvider,
        useValue: Object.assign({}, shareConfigsUpload, data),
        }
      ],
      imports: [CloudinaryModule, SharedModule],
      controllers: [UploaderController],
    }
  }
}
