import { Injectable } from '@nestjs/common';
import { PaginationDto } from './pagination.dto';

@Injectable()
export class PaginationService {

  getPagination(dto: PaginationDto, defaultPerPage = 30) {
    const page = Number(dto.page) || 1;
    const perPage = Number(dto.perPage) || defaultPerPage;
    const skip = (page - 1) * perPage;
    return { perPage, skip };
  }
}
