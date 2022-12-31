import { ConflictException } from '@nestjs/common';

export class UserAlreadyExistException extends ConflictException {
  constructor(error?: string) {
    super('User with that email already exists', error);
  }
}
