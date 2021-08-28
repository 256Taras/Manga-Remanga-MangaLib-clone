import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../environments/environment';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { MangaModule } from './manga/manga.module';
import { Manga } from './manga/entities/manga.entity';
import { ChaptersModule } from './chapters/chapters.module';
import { ChapterImages } from './chapters/entities/chapter-images.entity';
import { Chapter } from './chapters/entities/chapter.entity';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...environment.databaseConnection,
      entities:[User,Manga,ChapterImages,Chapter]
    }),
    AuthModule,
    UsersModule,
    MangaModule,
    ChaptersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
