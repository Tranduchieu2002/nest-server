import { NotFoundException } from '@nestjs/common';

export class PostNotFoundException extends NotFoundException {
  constructor(message: string = 'Not found',error?: string) {
    super(message, error);
  }
}
