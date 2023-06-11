import { Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 } from 'uuid';

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: 'upload',
        filename(_, file, callback) {
          callback(null, `${v4()}-${file.originalname}`);
        },
      }),
    };
  }
}
