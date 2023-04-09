import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Schema as MongooseSchema } from 'mongoose';
import { CommonExecutor } from 'src/shared/Common.executor';
import { CommonSchema } from 'src/shared/Common.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/modules/products/schemas/product.schema';
import { IsEnum } from 'class-validator';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

@Schema()
export class User extends CommonSchema {

  @Prop({ enum: UserRole, default: UserRole.USER })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  email: string;

  @ApiProperty()
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Product' }] })
  basket: Product[];

  @ApiProperty()
  @Prop()
  phone?: string;

  @ApiProperty()
  @Prop()
  avatar?: string;

  @ApiProperty()
  @Prop()
  password: string;

  @ApiProperty()
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Product' }] })
  favorites: Product[];
}

// @ApiProperty()
// @Prop()
// wallet: string;

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