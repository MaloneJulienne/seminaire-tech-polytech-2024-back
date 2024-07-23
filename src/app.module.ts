import { Module } from '@nestjs/common';
import { TypeormModule } from './config/typeorm/typeorm.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeormModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
