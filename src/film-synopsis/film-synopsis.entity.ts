import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class FilmSynopsis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  synopsis: string;

  @Column('text')
  resume: string;
}
