import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { CommonExecutor } from 'src/shared/Common.executor';
import { CommonSchema } from 'src/shared/Common.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from './order.schema';
import { Product } from 'src/modules/products/schemas/product.schema';

export type OrderItemDocument = HydratedDocument<OrderItem>;

@Schema()
export class OrderItem extends CommonSchema {
  @ApiProperty()
  @Prop()
  quantity: number;

  @ApiProperty()
  @Prop()
  price: number;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'Order' })
  order?: Order;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Product;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

OrderItemSchema.set('toJSON', {
  transform: function (_, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

@Injectable()
export class OrderItemExecutor extends CommonExecutor<OrderItemDocument> {
  constructor(@InjectModel(OrderItem.name) model: Model<OrderItemDocument>) {
    super(model);
  }
}
