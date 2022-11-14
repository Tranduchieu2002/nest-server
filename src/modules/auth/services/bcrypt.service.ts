import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  /**
   * generate hash from password or string
   * @param {string} password
   * @returns {string}
   */

  generateHash(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  async verifyHash(
    password: string | undefined,
    hash: string | undefined,
  ): Promise<boolean> {
    if (!password || !hash) {
      return Promise.resolve(false);
    }

    return await bcrypt.compare(password, hash);
  }
}
