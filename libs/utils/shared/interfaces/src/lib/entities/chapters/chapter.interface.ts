import { IManga } from '../manga/manga.interface';
import { IChapterImages } from './chapter-images.interface';


export interface IChapter {

  id: number;

  mangaId: number;


  chapter: string;


  title?: string;


  volume: number;

  createdAt: Date;


  updatedAt: Date;


  manga: IManga;

  chapterImages: IChapterImages[] | unknown;
}
