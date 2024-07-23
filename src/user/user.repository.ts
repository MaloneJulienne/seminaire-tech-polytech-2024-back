import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './user.entity';
import { Repository } from 'typeorm';
import logger from '../config/logger/logger';

@Injectable()
export default class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(email: string, password: string): Promise<boolean> {
    logger.trace('createUser has been called', {
      context: UserRepository.name,
      email: email,
    });

    const user: User = this.userRepository.create({ email, password });

    try {
      await this.userRepository.save(user);
      logger.info('User created successfully', {
        context: UserRepository.name,
        email: email,
      });
      return true;
    } catch (error: unknown) {
      logger.error('Failed to create user', {
        context: UserRepository.name,
        email: email,
      });
      logger.debug('Failed to create user', {
        context: UserRepository.name,
        email: email,
        stack: error,
      });
      return false;
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    logger.trace('getUserByEmail has been called', {
      context: UserRepository.name,
      email: email,
    });
    try {
      const user: User = await this.userRepository.findOne({
        where: { email },
      });

      if (user) {
        logger.info('User has been found', {
          context: UserRepository.name,
          email: email,
        });
      } else {
        logger.warn('User has not been found', {
          context: UserRepository.name,
          email: email,
        });
      }

      return user;
    } catch (error: unknown) {
      logger.error('Failed to fetch user', {
        context: UserRepository.name,
        email: email,
      });
      logger.debug('Failed to fetch user', {
        context: UserRepository.name,
        email: email,
        stack: error,
      });
      return null;
    }
  }
}
