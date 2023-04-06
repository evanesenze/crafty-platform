import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Schema as MongooseSchema } from 'mongoose';
import { CommonExecutor } from 'src/shared/Common.executor';
import { CommonSchema } from 'src/shared/Common.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/modules/categories/schemas/category.schema';
import { Product } from 'src/modules/products/schemas/product.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends CommonSchema {

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  email: string;

  @ApiProperty()
  @Prop()
  wallet: string;

  @ApiProperty()
  @Prop()
  type: string;

  @ApiProperty()
  @Prop()
  basket: string;

  @ApiProperty()
  @Prop()
  phone: string;

  @ApiProperty()
  @Prop()
  avatar: string;

  @ApiProperty()
  @Prop()
  password: string;

  @ApiProperty()
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Product' }] })
  favorites: Product[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  transform: function (_, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

@Injectable()
export class UserExecutor extends CommonExecutor<UserDocument> {
  constructor(@InjectModel(User.name) model: Model<UserDocument>) {
    super(model);
  }
}