import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { CommonExecutor } from 'src/shared/Common.executor';
import { CommonSchema } from 'src/shared/Common.schema';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/users/schemas/user.schema';
import { Product } from 'src/modules/products/schemas/product.schema';

export type ReviewDocument = HydratedDocument<Review>;

@Schema()
export class Review extends CommonSchema {

  @ApiProperty()
  @Prop()
  rating: number;

  @ApiProperty()
  @Prop()
  text: string;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Product;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

ReviewSchema.set('toJSON', {
  transform: function (_, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

@Injectable()
export class ReviewExecutor extends CommonExecutor<ReviewDocument> {
  constructor(@InjectModel(Review.name) model: Model<ReviewDocument>) {
    super(model);
  }
}