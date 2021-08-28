import { Connection } from 'typeorm';

import { CHAPTER_IMAGES_REPOSITORY, CHAPTER_REPOSITORY } from './chapter.constants';
import { Chapter } from '../entities/chapter.entity';
import { ChapterImages } from '../entities/chapter-images.entity';
import { ChaptersService } from '../services/chapters.service';

export const ChapterProviders = [
  {
    provide: CHAPTER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Chapter),
    inject: [Connection],
  },
  {
    provide: CHAPTER_IMAGES_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(ChapterImages),
    inject: [Connection],
  },
  ChaptersService
];
