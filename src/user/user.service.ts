import { Injectable } from '@nestjs/common';
import UserRepository from './user.repository';
import CreateUserDto from './dtos/create-user.dto';
import { compare, hash } from 'bcryptjs';
import { LoginUserDto } from './dtos/login-user.dto';
import InvalidCredentialsException from './errors/invalid-credentials.exception';
import User from './user.entity';
import AuthService from '../auth/auth.service';
import logger from '../config/logger/logger';
import UserCannotBeRegisteredException from './errors/user-cannot-be-registered.exception';

@Injectable()
export default class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<void> {
    logger.trace('register has been called', {
      context: UserService.name,
      email: createUserDto.email,
    });

    const { email, password } = createUserDto;
    const hashedPassword = await hash(password, 10);

    if (await this.userRepository.createUser(email, hashedPassword)) {
      logger.info('User successfully registered', {
        context: UserService.name,
        email: createUserDto.email,
      });
    } else {
      logger.error('Failed to register user', {
        context: UserService.name,
        email: email,
      });
      throw new UserCannotBeRegisteredException();
    }
  }

  async loginUser(
    loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string }> {
    logger.trace('loginUser has been called', {
      context: UserService.name,
      email: loginUserDto.email,
    });
    const { email, password } = loginUserDto;
    const user: User = await this.userRepository.getUserByEmail(email);

    if (!user || !(await compare(password, user.password))) {
      const exception = new InvalidCredentialsException();
      logger.warn(exception.message, {
        context: UserService.name,
        email: loginUserDto.email,
      });
      throw new InvalidCredentialsException();
    }

    const payload = { email: user.email, sub: user.id };
    const accessToken: string = this.authService.sign(payload);

    logger.info('User successfully logged in', {
      context: UserService.name,
      email: loginUserDto.email,
    });

    return { accessToken };
  }
}
