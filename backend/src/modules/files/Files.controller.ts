import {
  Post,
  Delete,
  Controller,
  UseInterceptors,
  UploadedFiles,
  Param,
  BadRequestException,
  Req,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from './Files.service';
import { FileResponseVm } from './schemas/FileResponseVm.schema';
import { Request } from 'express';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post('')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files'))
  saveFile(
    @Req() req: Request,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    if (!files?.length) throw new BadRequestException('Empty files');
    const protocol = req.protocol;
    const host = req.get('Host');
    const url = `${protocol}://${host}/`;
    return files.map((item) => url + item.filename);
  }

  @Delete(':path')
  @ApiCreatedResponse({ type: FileResponseVm })
  async deleteFile(@Param('path') path: string) {
    this.filesService.deleteFile(path);
  }
}
