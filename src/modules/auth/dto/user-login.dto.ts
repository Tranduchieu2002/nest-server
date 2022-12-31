import { StringField } from '../../../decorators';

export class UserLoginDto {
  @StringField({ isEmail: true, swagger: true})
  readonly email: string;

  @StringField({ swagger: true})
  readonly password: string;
}
