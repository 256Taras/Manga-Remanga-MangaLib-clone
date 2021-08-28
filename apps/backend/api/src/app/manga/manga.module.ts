import { Module } from '@nestjs/common';
import { UploadModule } from '../upload/upload.module';

import { MangaController } from './controllers/manga.controller';
import { MangaProviders } from './utils/manga.common';

@Module({
  imports:[UploadModule],
  controllers: [MangaController],
  providers: [...MangaProviders],
  exports:[MangaProviders[1]]
})
export class MangaModule {}
