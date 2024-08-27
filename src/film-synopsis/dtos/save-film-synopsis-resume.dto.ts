import { IsNotEmpty, IsString } from 'class-validator';

export default class SaveFilmSynopsisResumeDto {
  @IsNotEmpty()
  @IsString()
  synopsis: string;

  @IsNotEmpty()
  @IsString()
  resume: string;
}
