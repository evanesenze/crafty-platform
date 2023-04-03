import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { CommonExecutor } from 'src/shared/Common.executor';
import { CommonSchema } from 'src/shared/Common.schema';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { OrderItem } from './orderItem.schema';
import { User } from 'src/modules/users/schemas/user.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order extends CommonSchema {

  @ApiProperty()
  @Prop({ enum: ['t', 'd'], default: 'd' })
  @IsEnum(['t', 'd'])
  status: string;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'OrderItem' })
  items: OrderItem[];

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.set('toJSON', {
  transform: function (_, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

@Injectable()
export class OrderExecutor extends CommonExecutor<OrderDocument> {
  constructor(@InjectModel(Order.name) model: Model<OrderDocument>) {
    super(model);
  }
}