import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument, CategoryExecutor } from './schemas/category.schema';
import { CommonService, UpdateParam } from 'src/shared/Common.service';
import { getSlug } from 'src/shared/extra';

@Injectable()
export class CategoriesService extends CommonService<CategoryDocument, CategoryExecutor> {

  constructor(executor: CategoryExecutor) {
    super(executor);
  };

  async createCategory(dto: CreateCategoryDto) {
    const slug = await this.getCategorySlug(dto.name);
    return this.create<Category>({ ...dto, slug, });
  }

  async updateCategory(id: string, dto: UpdateCategoryDto) {
    let body: UpdateParam<Category> = { ...dto };
    if (dto.name) {
      const slug = await this.getCategorySlug(dto.name);
      body = { ...body, slug };
    }
    return this.update<Category>(id, body)
  }

  private async getCategorySlug(name: string) {
    const slug = getSlug(name);
    const existCategory = await this.findOne({ slug });
    if (existCategory) throw new BadRequestException('Category already exist');
    return slug;
  }
}
