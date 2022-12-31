import { Tokens } from '@/constants';
import { StringField } from '../../../decorators/api-field.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../../modules/user/dtos/user.dto';

export class TokenPayloadDto {
  @ApiProperty()
  expiresIn: number;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  rfExpiresAt: number;
  constructor(data: {
    expiresIn: number;
    accessToken: string;
    refreshToken: string;
    rfExpiresAt: number;
  }) {
    this.expiresIn = data.expiresIn;
    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
    this.rfExpiresAt = data.rfExpiresAt;
  }
}

export class RefreshTokenPayloadDto {
  @ApiProperty()
  @StringField()
  access_token: string; 
  
  @ApiProperty()
  @StringField()
  refresh_token: string;
  
}
export class RefreshTokenResponseDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  expirseTime: Date;

  constructor(data: Pick<Tokens, "access_token" > & { message: string,expirseTime: Date }) {
    this.access_token = data.access_token;
    this.expirseTime = data.expirseTime;
    this.message = data.message;
  }
}

export class LoginPayloadDto {
  @ApiProperty({
    type: UserDto,
  })
  user: UserDto;

  @ApiProperty({
    type: TokenPayloadDto,
  })
  token: TokenPayloadDto;

  constructor(user: UserDto, token: TokenPayloadDto) {
    this.token = token;
    this.user = user;
  }
}
