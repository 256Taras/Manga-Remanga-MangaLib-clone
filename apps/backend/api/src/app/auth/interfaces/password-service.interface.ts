export interface IPasswordService {
  getHash(password:string): Promise<string>;
  compareHash(password: string, passwordHash: string): Promise<boolean>;
}
