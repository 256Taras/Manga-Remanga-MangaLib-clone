import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordService {
  private saltRounds = 10;
  private keyLength = 64;

  public getHash(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      // generate random 16 bytes long salt
      const salt = crypto.randomBytes(this.saltRounds).toString('hex');

      crypto.scrypt(password, salt, this.keyLength, (err, derivedKey) => {
        if (err) reject(err);
        resolve(salt + ':' + derivedKey.toString('hex'));
      });
    });
  }

  public compareHash(password: string, passwordHash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const [salt, key] = passwordHash.split(':');
      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        resolve(key == derivedKey.toString('hex'));
      });
    });
  }
}
