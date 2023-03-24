import { ApiFile, IFile } from "../../decorators/index";
import { Body, Controller, HttpCode, HttpStatus, Post, UploadedFile } from "@nestjs/common";
import { UploaderService } from "./uploader.service";
import { RoleEnum } from "../../constants";

@Controller('upload')
export class UploaderController {
  constructor(private readonly uploadService: UploaderService) {  }

  @Post()
  // @AuthDecorators([RoleEnum.USER])
  @ApiFile({ name: 'file', isArray: false }, { isRequired: false })
  @HttpCode(HttpStatus.OK)
  upload(
    @UploadedFile() file: IFile,
  ) {
    return this.uploadService.handleUploadAFile(file);
  }
}