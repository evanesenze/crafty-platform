import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { CommonService } from 'src/shared/Common.service';
import { OrderDocument, OrderExecutor } from '../schemas/order.schema';
import { UsersService } from 'src/modules/users/users.service';
import { OrderItemsService } from './orderItems.service';
import { ObjectId } from 'mongoose';

@Injectable()
export class OrdersService extends CommonService<OrderDocument, OrderExecutor> {
  constructor(
    executor: OrderExecutor,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private orderItemsService: OrderItemsService,
  ) {
    super(executor);
  }

  async createOrder(dto: CreateOrderDto) {
    const order = await this.create(dto);
    for (const itemId of dto.items) {
      await this.orderItemsService.updateItem(itemId, { order: order.id as ObjectId });
      await this.usersService.deleteFromBasket(dto.buyer, itemId);
    }
    return order;
  }

  updateOrder(id: string, dto: UpdateOrderDto) {
    return this.update(id, dto);
  }
}
