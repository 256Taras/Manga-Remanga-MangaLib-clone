import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { IManga } from '@manga/utils/shared/interfaces';
import { Chapter } from '../../chapters/entities/chapter.entity';


@Entity('manga')
export class Manga implements IManga {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ default: null })
  public imgUrl: string | null;

  @Column()
  public title!: string;

  @Column()
  public englishTitle!: string;

  @Column()
  public originalTitle!: string;

  @Column()
  public author!: string;

  @Column('text')
  public description!: string;

  @Column()
  public year!: number;

  @Column({ default: 0 })
  public viewsCount: number;

  @Column({ default: 0 })
  public chapterCount: number;

  @Column({ default: 0 })
  public ratingCount: number;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @OneToMany(() => Chapter, chapter => chapter.manga, { cascade: true })
  @JoinTable()
  public chapters: Chapter[];
}


