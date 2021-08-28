import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Chapter } from './chapter.entity';
import { IChapterImages } from '@manga/utils/shared/interfaces';


@Entity('chapter_images')
export class ChapterImages implements IChapterImages{

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public imageLink: string;

  @Column()
  public imageNumber: number;

  @ManyToOne(() => Chapter, chapter => chapter.chapterImages, { onDelete: 'CASCADE' })
  public chapter: Chapter;

}
