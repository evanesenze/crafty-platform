import { BadRequestException, Injectable } from '@nestjs/common';
import { unlinkSync } from 'fs';

@Injectable()
export class FilesService {
  async deleteFile(path: string) {
    try {
      unlinkSync('upload/' + path);
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }
}
