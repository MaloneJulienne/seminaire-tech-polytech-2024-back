import { Body, Controller, Post } from '@nestjs/common';
import FilmSynopsisService from './film-synopsis.service';
import GenerateFilmSynopsisResumeDto from './dtos/generate-film-synopsis-resume.dto';

@Controller('film-synopsis')
export default class FilmSynopsisController {
  constructor(private readonly filmSynopsisService: FilmSynopsisService) {}

  @Post()
  async generateFilmSynopsisResume(
    @Body() generateFilmSynopsisResumeDto: GenerateFilmSynopsisResumeDto,
  ): Promise<void> {
    await this.filmSynopsisService.generateSynopsisResume(
      generateFilmSynopsisResumeDto.message,
    );
  }
}
