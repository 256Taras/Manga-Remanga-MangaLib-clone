import { IChapter } from './chapter.interface';

export interface IChapterImages {

  id: number;


  imageLink: string;


  imageNumber: number;


  chapter: IChapter | unknown;
}
