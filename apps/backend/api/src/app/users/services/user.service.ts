import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

import { CreateUserDto } from '../dtos/create-user.dto';
import { USER_REPOSITORY } from '../utils/user.constants';
import { IUser } from '@manga/utils/shared/interfaces';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly usersRepository: Repository<User>
  ) {}

  public async create(candidateData: CreateUserDto) {
    const candidate = await this.usersRepository.create(candidateData);
    await this.usersRepository.save(candidate);
    return candidate;
  }

  findAll() {
    return `This action returns all users`;
  }

  public async findOneById(id: number) {
    const user = await this.usersRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException(
      `User with id ${id} does not exist`,
      HttpStatus.NOT_FOUND
    );
  }

  public async getByEmail(email: string): Promise<IUser> {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND
    );
  }

  public async update(id: number, user: Partial<IUser>) {
    return this.usersRepository.update(id, user);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
