import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { USER_REPOSITORY } from '../utils/user.constants';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { IUser } from '@manga/data-access/shared/interfaces';

@Injectable()
export class UserService {

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly usersRepository: Repository<User>
  ) {
  }


  public async create(candidateData: CreateUserDto) {
    const candidate = await this.usersRepository.create(candidateData);
    await this.usersRepository.save(candidate);
    return candidate;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  public async getByEmail(email: string): Promise<IUser | HttpException> {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }


  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
