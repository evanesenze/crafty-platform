import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryDocument, CategoryExecutor } from './schemas/category.schema';
import { CommonService } from 'src/shared/Common.service';
import { getSlug } from 'src/shared/extra';

@Injectable()
export class CategoriesService extends CommonService<CategoryDocument, CategoryExecutor> {

  constructor(executor: CategoryExecutor) {
    super(executor);
  };

  async createCategory(dto: CreateCategoryDto) {
    const slug = getSlug(dto.name);
    const existCategory = await this.findOne({ slug });
    if (existCategory) throw new BadRequestException('Category with same slug already exist');
    return this.create({ ...dto, slug });
  }

  updateCategory(id: string, dto: UpdateCategoryDto) {
    return this.update(id, dto);
  }
}
