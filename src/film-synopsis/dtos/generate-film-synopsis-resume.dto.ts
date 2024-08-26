import { IsNotEmpty, IsString } from 'class-validator';

export default class GenerateFilmSynopsisResumeDto {
  @IsNotEmpty()
  @IsString()
  message: string;
}
