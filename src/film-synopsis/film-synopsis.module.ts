import { Module } from '@nestjs/common';
import ClaudeModule from '../claude/claude.module';
import FilmSynopsisService from './film-synopsis.service';
import FilmSynopsisController from './film-synopsis.controller';

@Module({
  imports: [ClaudeModule],
  providers: [FilmSynopsisService],
  controllers: [FilmSynopsisController],
})
export default class FilmSynopsisModule {}
