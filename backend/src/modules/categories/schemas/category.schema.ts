import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { CommonExecutor } from 'src/shared/Common.executor';
import { CommonSchema } from 'src/shared/Common.schema';
import { ApiProperty } from '@nestjs/swagger';

export type CategoryDocument = HydratedDocument<Category>;

export interface ICategory {
  name: string;
  slug: string;
}

@Schema()
export class Category extends CommonSchema {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  slug: string;
}

export const CategorySchema = SchemaFactory.createForClass<ICategory>(Category);

CategorySchema.set('toJSON', {
  transform: function (_, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

@Injectable()
export class CategoryExecutor extends CommonExecutor<CategoryDocument> {
  constructor(@InjectModel(Category.name) model: Model<CategoryDocument>) {
    super(model);
  }
}