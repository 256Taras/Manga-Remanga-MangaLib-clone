import { Connection } from 'typeorm';

import { MANGA_REPOSITORY } from './manga.constants';
import { Manga } from '../entities/manga.entity';
import { MangaService } from '../services/manga.service';

export const MangaProviders = [
  {
    provide: MANGA_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Manga),
    inject: [Connection],
  },
  MangaService
];
