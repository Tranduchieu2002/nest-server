import { StringOptionalField } from '../../../decorators';

export class UpdateUserDto {

  @StringOptionalField({swagger: true})
  readonly firstName?: string

  @StringOptionalField({swagger: true})
  readonly lastName?: string

  @StringOptionalField({swagger: true})
  oldPassword?: string;

  @StringOptionalField({swagger: true})
  password?: string;
}