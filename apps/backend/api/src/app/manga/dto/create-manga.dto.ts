import { IsInt, Length,IsString, IsNotEmpty, Min, Max  } from 'class-validator';
import { IManga } from '@manga/utils/shared/interfaces';

export class CreateMangaDto implements  Partial<IManga>{

  @IsString()
  @IsNotEmpty()
  imgUrl: string | null;

  @Length(2, 20)
  title!: string;

  @Length(2, 20)
  englishTitle!: string;

  @Length(2, 20)
  originalTitle!: string;

  @Length(2, 25)
  author!: string;

  @Length(20, 300)
  description!: string;

  @IsInt()
  @Min(1970)
  @Max(2021)
  year!: number;

  @IsString()
  updatedAt:string

}
