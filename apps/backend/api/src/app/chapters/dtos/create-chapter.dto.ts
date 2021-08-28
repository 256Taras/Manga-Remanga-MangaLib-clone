import { IChapter } from "@manga/utils/shared/interfaces";
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateChapterDto implements Partial<IChapter>{


  @IsInt()
  @IsNotEmpty()
  mangaId: number;

  @IsString()
  @IsNotEmpty()
  chapter: string;

  @IsString()
  title?: string;


}
