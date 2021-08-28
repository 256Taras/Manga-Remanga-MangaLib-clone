import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateChapterDto } from '../dtos/create-chapter.dto';
import { UpdateChapterDto } from '../dtos/update-chapter.dto';
import { MangaService } from '../../manga/services/manga.service';
import { UploadService } from '../../upload/services/upload.service';
import { CHAPTER_IMAGES_REPOSITORY, CHAPTER_REPOSITORY } from '../utils/chapter.constants';
import { IChapter, IChapterImages } from '@manga/utils/shared/interfaces';
import { Repository } from 'typeorm';

@Injectable()
export class ChaptersService {

  constructor(
    @Inject(CHAPTER_REPOSITORY)
    private readonly chapterRepository: Repository<IChapter>,
    @Inject(CHAPTER_IMAGES_REPOSITORY)
    private readonly chapterImagesRepository: Repository<IChapterImages>,
    private readonly mangaService: MangaService,
    private readonly uploadService: UploadService
  ) {
  }


  /**
   *
   * @param files - chapter images
   * @param dto {CreateChapterDto}
   * @description - creates a manga chapter and also stores the photos in local storage
   */

  async create(files: unknown, dto: CreateChapterDto): Promise<IChapter> {

    /**
     * Find manga by id
     */

    const manga = await this.mangaService.findOne(dto.mangaId);


    if (manga) {

      /**
       *  Change  space to hyphen, add delete other symbol
       */

      const mangaOrgName = manga.englishTitle
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[&/\\#,+()$~%.'":*?<>{}]/g, '');


      /**
       * Get the number of all chapters of the found manga
       */

      const mangaVolume = await this.chapterRepository
        .createQueryBuilder('chapter')
        .where('chapter.mangaId = :mangaId', { mangaId: dto.mangaId })
        .getCount();

      /**
       * Create a link to a file
       */

      const images = await this.uploadService.createChapterImages(files, mangaOrgName, dto.chapter);
      console.log(images);


      /**
       * Save chapter
       */



      const saved = await this.chapterRepository.save({ ...dto, chapterImages: images, volume: mangaVolume, manga });

      if (saved) {
        /**
         * update parallel updatedAt
         */

        const now = new Date().toISOString();
        this.mangaService.update(dto.mangaId, { updatedAt: now }).then();

        return saved;
      }

    }
    throw new HttpException(`Манга з id=${dto.mangaId} не знайдена`, HttpStatus.BAD_REQUEST);
  }


  findAll() {
    return `This action returns all chapters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chapter`;
  }

  update(id: number, updateChapterDto: UpdateChapterDto) {
    return `This action updates a #${id} chapter`;
  }

  public async  remove(id: number) {
    const deleteResponse = await this.chapterRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Розділ не знайдено', HttpStatus.NOT_FOUND);
    }
  }

  public async findChapterById(chapterId: number) {
      const chapter = await this.chapterRepository.createQueryBuilder('chapter')
        .where({ id: chapterId })
        .leftJoinAndSelect('chapter.chapterImages', 'chapter_images')
        .getOne();

      if (!chapter){
        throw new HttpException(`Chapter with id ${chapterId} does not exist`, HttpStatus.NOT_FOUND);
      }
      return  chapter
  }
}
