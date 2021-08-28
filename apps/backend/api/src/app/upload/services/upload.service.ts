import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as  path from 'path';
import * as  fs from 'fs';
import * as uuid from 'uuid';


@Injectable()
export class UploadService {

  public async createMangaCover(file, mangaName): Promise<{ cover: string }> {

    try {

      const fileExtension = this.fileExt(file);

      const fileName = mangaName + uuid.v4() + '.' + fileExtension;

      const filePath = path.resolve(__dirname, '..', '..', 'static', 'manga-cover', mangaName);

      await this.createFileDirectory(file, filePath, fileName);

      return { cover: 'manga-cover' + '/' + mangaName + '/' + fileName };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async createChapterImages(files, mangaName, chapterNumber):Promise<{imageLink:string;imageNumber:number}[]> {
    try {
      const chapterPhoto = [];

      for (const file of files) {
        const index: number = files.indexOf(file);

        const fileExtension = this.fileExt(file);

        const fileName = mangaName + '-' + chapterNumber + uuid.v4() + '.' + fileExtension;

        const filePath = path.resolve(__dirname, '..', '..', 'static', mangaName, chapterNumber);


        await this.createFileDirectory(file, filePath, fileName);


        const fileResponse = {
          imageLink: mangaName + '/' + chapterNumber + '/' + fileName,
          imageNumber: index + 1
        };
        chapterPhoto.push(fileResponse);
      }


      return chapterPhoto;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  private async createFileDirectory(file, filePath, fileName): Promise<void> {
    fs.access(filePath, function(err) {
      if (err && err.code === 'ENOENT') {
        fs.mkdir(filePath, { recursive: true }, (err) => {
          if (err) throw err;
          fs.writeFile(path.resolve(filePath, fileName), file.buffer, (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });
        });
      }
    });
  }

  private fileExt(file): string {
    return file.originalname.split('.').pop();
  }

}
