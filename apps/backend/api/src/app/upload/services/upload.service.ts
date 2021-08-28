import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as  path from 'path';
import * as  fs from 'fs';
import * as uuid from 'uuid';


@Injectable()
export class UploadService {

  public async createMangaCover(file, mangaName):Promise<{cover:string}>  {

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

  private async createFileDirectory(file, filePath, fileName):Promise<void> {
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

  private fileExt(file):string {
    return file.originalname.split('.').pop();
  }

}
