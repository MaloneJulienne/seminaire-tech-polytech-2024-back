import { Module } from '@nestjs/common';
import ClaudeModule from './claude/claude.module';
import FilmSynopsisModule from './film-synopsis/film-synopsis.module';
import { AwsModule } from './aws/aws.module';
import { TypeormModule } from './config/typeorm/typeorm.module';
import { ConfigModule } from '@nestjs/config';
import awsConfiguration from './config/aws/aws.config';
import databaseConfiguration from './config/database/database.config';

@Module({
  imports: [
    ClaudeModule,
    FilmSynopsisModule,
    AwsModule,
    TypeormModule,
    ConfigModule.forRoot({
      load: [databaseConfiguration, awsConfiguration],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
