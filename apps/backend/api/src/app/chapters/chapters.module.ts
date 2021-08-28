import { Module } from '@nestjs/common';


import { ChaptersController } from './controllers/chapters.controller';
import { ChapterProviders } from './utils/chapter.common';
import { UploadModule } from '../upload/upload.module';
import { MangaModule } from '../manga/manga.module';

@Module({
  imports:[UploadModule,MangaModule],
  controllers: [ChaptersController],
  providers: [...ChapterProviders],
  exports: [...ChapterProviders]
})
export class ChaptersModule {}
