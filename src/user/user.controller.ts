import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import UserService from './user.service';
import CreateUserDto from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import logger from '../config/logger/logger';
import InvalidCredentialsException from './errors/invalid-credentials.exception';
import UserCannotBeRegisteredException from './errors/user-cannot-be-registered.exception';

@Controller('/users')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async register(@Body() createUserDto: CreateUserDto): Promise<void> {
    logger.trace('register has been called', {
      context: UserController.name,
      email: createUserDto.email,
    });
    logger.debug('Register request received', {
      context: UserController.name,
      email: createUserDto.email,
      url: '/users/create',
    });
    try {
      await this.userService.register(createUserDto);
      logger.info('Registration successful', {
        context: UserController.name,
        email: createUserDto.email,
      });
    } catch (error: unknown) {
      if (error instanceof UserCannotBeRegisteredException) {
        const knownError = error as UserCannotBeRegisteredException;
        logger.info('Registration process not completed', {
          context: UserController.name,
          email: createUserDto.email,
        });
        logger.debug('Registration process not completed', {
          context: UserController.name,
          email: createUserDto.email,
          error: knownError.message,
          url: '/users/create',
        });
        throw new BadRequestException(knownError.message);
      }

      const knownError = error as Error;
      logger.warn('An internal exception occurs', {
        context: UserController.name,
        email: createUserDto.email,
      });
      logger.debug('An internal exception occurs', {
        context: UserController.name,
        email: createUserDto.email,
        error: knownError.message,
        url: '/users/create',
      });
      throw new InternalServerErrorException(knownError.message);
    }
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string }> {
    logger.trace('login has been called', {
      context: UserController.name,
      email: loginUserDto.email,
    });
    logger.debug('Login request received', {
      context: UserController.name,
      email: loginUserDto.email,
      url: '/users/login',
    });
    try {
      const accessToken = await this.userService.loginUser(loginUserDto);
      logger.info('User successfully logged in.', {
        context: UserController.name,
        email: loginUserDto.email,
      });
      return accessToken;
    } catch (error: unknown) {
      if (error instanceof InvalidCredentialsException) {
        const knownError = error as InvalidCredentialsException;
        logger.info('Login process not completed', {
          context: UserController.name,
          email: loginUserDto.email,
        });
        logger.debug('Login process not completed', {
          context: UserController.name,
          email: loginUserDto.email,
          error: knownError.message,
          url: '/users/login',
        });
        throw new UnauthorizedException(knownError.message);
      }

      const knownError = error as Error;
      logger.warn('An internal exception occurs', {
        context: UserController.name,
        email: loginUserDto.email,
      });
      logger.debug('An internal exception occurs', {
        context: UserController.name,
        email: loginUserDto.email,
        error: knownError.message,
        url: '/users/create',
      });

      throw new InternalServerErrorException(knownError.message);
    }
  }
}
