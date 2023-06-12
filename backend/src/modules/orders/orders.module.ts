import { Module, forwardRef } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './orders.controller';
import { Order, OrderExecutor, OrderSchema } from './schemas/order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PaginationService } from '../pagination/pagination.service';
import { OrderItemsService } from './services/orderItems.service';
import {
  OrderItem,
  OrderItemExecutor,
  OrderItemSchema,
} from './schemas/orderItem.schema';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [OrdersController],
  providers: [
    OrderExecutor,
    OrderItemExecutor,
    OrdersService,
    OrderItemsService,
    PaginationService,
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: OrderItem.name, schema: OrderItemSchema },
    ]),
    forwardRef(() => UsersModule),
  ],
  exports: [OrdersService, OrderItemsService, OrderExecutor, OrderItemExecutor],
})
export class OrdersModule {}
