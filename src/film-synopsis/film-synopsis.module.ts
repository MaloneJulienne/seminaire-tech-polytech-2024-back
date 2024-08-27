import { Module } from '@nestjs/common';
import ClaudeModule from '../claude/claude.module';
import FilmSynopsisService from './film-synopsis.service';
import FilmSynopsisController from './film-synopsis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormModule } from '../config/typeorm/typeorm.module';
import FilmSynopsis from './film-synopsis.entity';
import FilmSynopsisRepository from './film-synopsis.repository';

@Module({
  imports: [
    ClaudeModule,
    TypeormModule,
    TypeOrmModule.forFeature([FilmSynopsis]),
  ],
  providers: [FilmSynopsisService, FilmSynopsisRepository],
  controllers: [FilmSynopsisController],
})
export default class FilmSynopsisModule {}
