import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { CreateMangaDto } from '../dto/create-manga.dto';
import { UpdateMangaDto } from '../dto/update-manga.dto';
import { Repository } from 'typeorm';
import { Manga } from '../entities/manga.entity';
import { MANGA_REPOSITORY } from '../utils/manga.constants';
import { UploadService } from '../../upload/services/upload.service';
import { IManga } from '@manga/utils/shared/interfaces';

@Injectable()
export class MangaService {

  constructor(
    @Inject(MANGA_REPOSITORY)
    private readonly mangaRepository: Repository<Manga>,
    private readonly uploadService: UploadService
  ) {
  }

  public async create(file, dto: CreateMangaDto) {
    try {
      const mangaCover = await this.uploadService.createMangaCover(file, dto.title);
      const mangaCandidate = { ...dto, imgUrl: mangaCover.cover };
      const manga = this.mangaRepository.create(mangaCandidate);
      await this.mangaRepository.save(manga);
      return manga;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async recommendations(): Promise<IManga[]> {
    return this.mangaRepository.find();
  }

  async findOne(id: number): Promise<IManga> {
    try {
      const manga = await this.mangaRepository
        .createQueryBuilder('manga')
        .where('id = :id', { id })
        .getOne();

      manga.viewsCount++;

      await this.mangaRepository
        .createQueryBuilder('manga')
        .update(Manga)
        .set({ viewsCount: manga.viewsCount })
        .where('id = :id', { id })
        .execute();

      return manga;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async update(id: number, data: UpdateMangaDto) {
    await this.mangaRepository.update({ id }, data);
    return await this.mangaRepository.findOne({ id });
  }

  public async remove(id: number) {
    return await this.mangaRepository.delete(+id);
  }


}
