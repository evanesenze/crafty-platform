import { OrderItemsService } from './services/orderItems.service';
import { PaginationService } from '../pagination/pagination.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto, UpdateOrderItemDto } from './dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetAllProductDto } from '../products/dto/get-all-product.dto';
import { Auth } from '../auth/decortators/auth.decorator';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService, private orderItemsService: OrderItemsService, private paginationService: PaginationService) { }

  @UsePipes(new ValidationPipe())
  @Auth()
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get()
  findAll(dto: GetAllProductDto = {}) {
    const { searchTerm, sort } = dto;
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOneById(id);
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.updateOrder(id, updateOrderDto);
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }

  @Get(':orderId/items/:itemId')
  findOneItem(@Param('orderId') orderId: string, @Param('itemId') itemId: string) {
    return this.orderItemsService.findOneById('');
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @Patch(':orderId/items/:itemId')
  updateItem(@Param('orderId') orderId: string, @Param('itemId') itemId: string, @Body() updateOrderDto: UpdateOrderItemDto) {
    return this.orderItemsService.updateItem('', updateOrderDto);
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @Delete(':orderId/items/:itemId')
  removeItem(@Param('orderId') orderId: string, @Param('itemId') itemId: string) {
    return this.orderItemsService.remove('');
  }
}
