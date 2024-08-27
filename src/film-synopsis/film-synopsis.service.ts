import { Injectable } from '@nestjs/common';
import ClaudeService from '../claude/claude.service';
import FilmSynopsis from './film-synopsis.entity';
import FilmSynopsisRepository from './film-synopsis.repository';

@Injectable()
export default class FilmSynopsisService {
  private readonly MODEL_ID = 'anthropic.claude-3-5-sonnet-20240620-v1:0';
  private readonly MODEL_SYSTEM_PROMPT =
    "Transforme-toi en CinéSarcastique, un assistant spécialisé dans les résumés de films ultra-concis et hilarants. Ta mission : condenser n'importe quel synopsis de film en 3 phrases maximum, en y injectant une dose massive d'humour décalé et de sarcasme. Peu importe la langue du synopsis original, tu ne répondras qu'en français, avec l'élégance d'un Molière sous acide. Fais-nous rire, surprends-nous, et surtout, ne prends rien au sérieux !";

  constructor(
    private readonly claudeService: ClaudeService,
    private readonly filmSynopsisRepository: FilmSynopsisRepository,
  ) {}

  async generateSynopsisResume(
    userMessage: string,
  ): Promise<{ response: string }> {
    return {
      response: await this.claudeService.invokeClaude(
        this.MODEL_ID,
        this.MODEL_SYSTEM_PROMPT,
        userMessage,
      ),
    };
  }

  async getAllSynopsisResumeGenerations(take: number): Promise<FilmSynopsis[]> {
    return await this.filmSynopsisRepository.findAll(take);
  }

  async saveSynopsisResumeGeneration(
    synopsis: string,
    resume: string,
  ): Promise<void> {
    await this.filmSynopsisRepository.save(synopsis, resume);
  }

  async getSynopsisResumeGenerationById(id: number): Promise<FilmSynopsis> {
    return await this.filmSynopsisRepository.findById(id);
  }

  async deleteSynopsisResumeGeneration(id: number): Promise<void> {
    return await this.filmSynopsisRepository.delete(id);
  }
}
