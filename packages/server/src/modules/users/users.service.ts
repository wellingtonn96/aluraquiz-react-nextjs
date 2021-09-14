import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/createUserDTO.';
import User from './entities/User';
import { UserRepository } from './users.repository';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async createUser(data: CreateUserDTO): Promise<User | undefined> {
    const userExists = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });

    if (userExists) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'User already exists!',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const password_hash = await hash(data.password, 8);

    const user = this.userRepository.create(
      Object.assign(data, (data.password = password_hash)),
    );

    await this.userRepository.save(user);

    return user;
  }
}
