import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/createUserDTO.';
import User from './entities/User';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async signUp(@Body() data: CreateUserDTO): Promise<User | undefined> {
    return this.userService.createUser(data);
  }
}
