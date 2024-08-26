import { Module } from '@nestjs/common';
import ClaudeModule from './claude/claude.module';
import FilmSynopsisModule from './film-synopsis/film-synopsis.module';
import { AwsModule } from './aws/aws.module';

@Module({
  imports: [ClaudeModule, FilmSynopsisModule, AwsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
