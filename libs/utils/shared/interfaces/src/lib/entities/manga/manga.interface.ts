
export interface IManga {


  /**
   *  Manga ID
   */
  id: number;

  /**
   * image URL manga link
   */
  imgUrl: string | null;

  /**
   * Manga Title
   */
  title: string;

  /**
   * English manga Title
   */
  englishTitle: string;

  /**
   * Original name manga
   */
  originalTitle: string;


  /**
   * Author who created manga
   */
  author: string;


  /**
   * Description manga
   */
  description: string;

  /**
   * Year manga
   */
  year: number;

  /**
   * Number of views in manga
   */
  viewsCount: number;

  /**
   * The country where the manga was released
   */
  chapterCount: number;

  /**
   * The total number of manga ratings is rated by users
   */
  ratingCount: number;

  /**
   * Date created  manga
   */
  createdAt: Date;

  /**
   * Date created  updated
   */
  updatedAt: Date;
}
