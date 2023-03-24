import { IFile } from "@/decorators/index";
import { ValidatorService } from "../../shared/services/validator.service";
import { Inject, Injectable } from "@nestjs/common";
import { CloudinaryService } from "../cloud-dinary/cloudinary.service";
import { FileNotImageException } from "../../exceptions/invalid-image-file";
import { IShareUploadConfigs } from "./uploader.module";

@Injectable()
export class UploaderService {
  constructor(
    @Inject('UPLOAD_CONFIGS_PROVIDER') private readonly uploadProvideConfig: IShareUploadConfigs,
    private readonly cloudinaryService : CloudinaryService,
    private readonly validatorService: ValidatorService,
    ) {}
    
  async handleUploadAFile(file: IFile) {
    if(!this.validatorService.isImage(file?.mimetype))  throw new FileNotImageException('Not accepted !');
    const a = await this.cloudinaryService.uploadFile(file, {
      format: 'jpg',
      resource_type: "image",
      discard_original_filename: false,
      use_filename: true,
      unique_filename: false,
      
      filename_override: file.originalname,
      ...this.uploadProvideConfig
    }, {
      width: 200,
      height: 200,
    }, true);
    return a;
  }
}