import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { CreateMangaDto } from '../dto/create-manga.dto';
import { UpdateMangaDto } from '../dto/update-manga.dto';
import { Repository } from 'typeorm';
import { Manga } from '../entities/manga.entity';
import { MANGA_REPOSITORY } from '../utils/manga.constants';
import { UploadService } from '../../upload/services/upload.service';

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

  findAll() {
    return `This action returns all manga`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manga`;
  }

  update(id: number, updateMangaDto: UpdateMangaDto) {
    return `This action updates a #${id} manga`;
  }

  remove(id: number) {
    return `This action removes a #${id} manga`;
  }
}
