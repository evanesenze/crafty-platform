import { Module } from '@nestjs/common';
import { FilesController } from './Files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from './GridFsMulterConfig.service';
import { FilesService } from './Files.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
  ],
  controllers: [FilesController],
  providers: [GridFsMulterConfigService, FilesService],
})
export class FilesModule {}
