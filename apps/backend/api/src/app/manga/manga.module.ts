import { Module } from '@nestjs/common';
import { MangaService } from './services/manga.service';
import { MangaController } from './controllers/manga.controller';

@Module({
  controllers: [MangaController],
  providers: [MangaService]
})
export class MangaModule {}
