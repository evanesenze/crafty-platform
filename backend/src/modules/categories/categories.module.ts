import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category, CategoryExecutor, CategorySchema } from './schemas/category.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [CategoriesController],
  providers: [CategoryExecutor, CategoriesService],
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
  ],
  exports: [CategoriesService, CategoryExecutor]
})
export class CategoriesModule { }
