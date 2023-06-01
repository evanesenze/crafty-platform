import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Schema as MongooseSchema } from 'mongoose';
import { CommonExecutor } from 'src/shared/Common.executor';
import { CommonSchema } from 'src/shared/Common.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Category, ICategory } from 'src/modules/categories/schemas/category.schema';
import { User } from 'src/modules/users/schemas/user.schema';

export type ProductDocument = HydratedDocument<Product>;

export interface IProduct {
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  category: ICategory;
}

@Schema()
export class Product extends CommonSchema {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  slug: string;

  @ApiProperty()
  @Prop()
  description: string;

  @ApiProperty()
  @Prop()
  price: number;

  @ApiProperty()
  @Prop()
  images: string[];

  @ApiProperty()
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' })
  category: Category;
  
  @ApiProperty()
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  owner: User;
}

export const ProductSchema = SchemaFactory.createForClass<IProduct>(Product);

ProductSchema.set('toJSON', {
  transform: function (_, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});


@Injectable()
export class ProductExecutor extends CommonExecutor<ProductDocument> {
  constructor(@InjectModel(Product.name) model: Model<ProductDocument>) {
    super(model);
  }
}