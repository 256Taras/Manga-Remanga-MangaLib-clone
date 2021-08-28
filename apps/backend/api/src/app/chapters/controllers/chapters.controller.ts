import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ChaptersService } from '../services/chapters.service';
import { CreateChapterDto } from '../dtos/create-chapter.dto';
import { UpdateChapterDto } from '../dtos/update-chapter.dto';
import { IChapter } from '@manga/utils/shared/interfaces';

@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {
  }


  @Post()
  @UseInterceptors(FilesInterceptor('chapter-images', 30))
  public createChapter(@UploadedFiles() files, @Body() dto: CreateChapterDto): Promise<IChapter> {
    return this.chaptersService.create(files, dto);
  }


  @Get(':id')
  private getOne(@Param('id') id: string) {
    return this.chaptersService.findChapterById(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChapterDto: UpdateChapterDto) {
    return this.chaptersService.update(+id, updateChapterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chaptersService.remove(+id);
  }
}
