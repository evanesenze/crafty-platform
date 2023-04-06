import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order, OrderExecutor, OrderSchema } from './schemas/order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PaginationService } from '../pagination/pagination.service';

@Module({
  controllers: [OrdersController],
  providers: [OrderExecutor, OrdersService, PaginationService],
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
})
export class OrdersModule { }
