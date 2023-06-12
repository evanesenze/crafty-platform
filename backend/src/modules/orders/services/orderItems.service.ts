import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/shared/Common.service';
import { OrderItemDocument, OrderItemExecutor } from '../schemas/orderItem.schema';
import { UpdateOrderItemDto } from '../dto/update-order.dto';
import { OrderItemDto } from '../dto/create-order.dto';

@Injectable()
export class OrderItemsService extends CommonService<OrderItemDocument, OrderItemExecutor> {
  constructor(executor: OrderItemExecutor) {
    super(executor);
  };

  createItem(dto: OrderItemDto) {
    return this.create(dto);
  }

  updateItem(id: string, dto: UpdateOrderItemDto) {
    return this.update(id, dto);
  }
}
