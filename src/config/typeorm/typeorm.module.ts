import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      database: 'logger',
      port: 5432,
      schema: 'public',
      username: 'logger',
      password: 'logger',
      entities: [__dirname + './../../**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false,
    }),
  ],
})
export class TypeormModule {}
