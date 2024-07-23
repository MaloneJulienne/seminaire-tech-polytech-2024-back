import { Module } from '@nestjs/common';
import { TypeormModule } from '../config/typeorm/typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './user.entity';
import UserService from './user.service';
import UserRepository from './user.repository';
import { AuthModule } from '../auth/auth.module';
import UserController from './user.controller';

@Module({
  imports: [TypeormModule, TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
