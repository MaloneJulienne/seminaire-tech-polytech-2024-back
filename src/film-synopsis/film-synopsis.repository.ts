import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import FilmSynopsis from './film-synopsis.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export default class FilmSynopsisRepository {
  constructor(
    @InjectRepository(FilmSynopsis)
    private readonly repository: Repository<FilmSynopsis>,
  ) {}

  async findAll(take: number = -1): Promise<FilmSynopsis[]> {
    return await this.repository.find({
      take: take === -1 ? undefined : take,
    });
  }

  async findById(id: number): Promise<FilmSynopsis> {
    return await this.repository.findOne({ where: { id } });
  }

  async save(synopsis: string, resume: string): Promise<void> {
    await this.repository.save({
      synopsis,
      resume,
    });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete({
      id,
    });
  }
}
