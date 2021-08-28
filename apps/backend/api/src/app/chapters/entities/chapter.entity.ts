import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';


import { Manga } from '../../manga/entities/manga.entity';
import { ChapterImages } from './chapter-images.entity';
import { IChapter } from '@manga/utils/shared/interfaces';

@Entity('chapter')
export class Chapter implements IChapter {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ default: 1, nullable: true })
  public mangaId: number;

  @Column({ type: 'real', scale: 1 })
  public chapter!: string;

  @Column()
  public title?: string;

  @Column({ type: 'int', default: 1, nullable: true })
  public volume: number;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @ManyToOne(() => Manga, manga => manga.chapters)
  public manga: Manga;

  @OneToMany(() => ChapterImages, chapterImages => chapterImages.chapter, { cascade: true })
  public chapterImages: ChapterImages[];
}

