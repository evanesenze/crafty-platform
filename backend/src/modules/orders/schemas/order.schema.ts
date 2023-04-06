import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Schema as MongooseSchema } from 'mongoose';
import { CommonExecutor } from 'src/shared/Common.executor';
import { CommonSchema } from 'src/shared/Common.schema';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { OrderItem } from './orderItem.schema';
import { User } from 'src/modules/users/schemas/user.schema';

export type OrderDocument = HydratedDocument<Order>;

export enum OrderStatus {
  OK = 'OK',
  BAD = 'BAD'
}

@Schema()
export class Order extends CommonSchema {

  @ApiProperty()
  @Prop({ enum: OrderStatus, default: OrderStatus.OK })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiProperty()
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'OrderItem' }] })
  items: OrderItem[];

  @ApiProperty()
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
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