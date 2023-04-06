import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CommonService } from 'src/shared/Common.service';
import { OrderDocument, OrderExecutor } from './schemas/order.schema';

@Injectable()
export class OrdersService extends CommonService<OrderDocument, OrderExecutor> {
  constructor(executor: OrderExecutor) {
    super(executor);
  };

  createOrder(dto: CreateOrderDto) {
    return this.create(dto);
  }

  updateOrder(id: string, dto: UpdateOrderDto) {
    return this.update(id, dto);
  }
}
