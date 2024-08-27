import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import FilmSynopsisService from './film-synopsis.service';
import GenerateFilmSynopsisResumeDto from './dtos/generate-film-synopsis-resume.dto';
import FilmSynopsis from './film-synopsis.entity';
import SaveFilmSynopsisResumeDto from './dtos/save-film-synopsis-resume.dto';

@Controller('film-synopsis')
export default class FilmSynopsisController {
  constructor(private readonly filmSynopsisService: FilmSynopsisService) {}

  @Post('generate')
  async generateFilmSynopsisResume(
    @Body() generateFilmSynopsisResumeDto: GenerateFilmSynopsisResumeDto,
  ): Promise<{ response: string }> {
    return await this.filmSynopsisService.generateSynopsisResume(
      generateFilmSynopsisResumeDto.message,
    );
  }

  @Get()
  async listLastFilmSynopsisGeneration(
    @Query('take') take: number,
  ): Promise<FilmSynopsis[]> {
    return await this.filmSynopsisService.getAllSynopsisResumeGenerations(
      take ?? 10,
    );
  }

  @Get('/:id')
  async getFilmSynopsisGenerationById(
    @Param('id') id: number,
  ): Promise<FilmSynopsis> {
    return await this.filmSynopsisService.getSynopsisResumeGenerationById(id);
  }

  @Post()
  async saveFilmSynopsisGeneration(
    @Body() saveFilmSynopsisResumeDto: SaveFilmSynopsisResumeDto,
  ): Promise<void> {
    await this.filmSynopsisService.saveSynopsisResumeGeneration(
      saveFilmSynopsisResumeDto.synopsis,
      saveFilmSynopsisResumeDto.resume,
    );
  }

  @Delete('/:id')
  async deleteFilmSynopsisGeneration(@Param('id') id: number): Promise<void> {
    await this.filmSynopsisService.deleteSynopsisResumeGeneration(id);
  }
}
