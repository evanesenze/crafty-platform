import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/shared/Common.service';
import { OrderItemDocument, OrderItemExecutor } from '../schemas/orderItem.schema';

@Injectable()
export class OrderItemsService extends CommonService<OrderItemDocument, OrderItemExecutor> {
  constructor(executor: OrderItemExecutor) {
    super(executor);
  };

  createItem(dto: any) {
    return this.create(dto);
  }

  updateItem(id: string, dto: any) {
    return this.update(id, dto);
  }
}
