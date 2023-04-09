import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto, OrderItemDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) { }

export class UpdateOrderItemDto extends PartialType(OrderItemDto) { }
