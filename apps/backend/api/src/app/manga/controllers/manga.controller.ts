import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MangaService } from '../services/manga.service';
import { CreateMangaDto } from '../dto/create-manga.dto';
import { UpdateMangaDto } from '../dto/update-manga.dto';

@Controller('manga')
export class MangaController {
  constructor(private readonly mangaService: MangaService) {}

  @Post()
  public create(@Body() createMangaDto: CreateMangaDto) {
    return this.mangaService.create(createMangaDto);
  }

  @Get()
  findAll() {
    return this.mangaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mangaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMangaDto: UpdateMangaDto) {
    return this.mangaService.update(+id, updateMangaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mangaService.remove(+id);
  }
}
