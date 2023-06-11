import { OrderItemsService } from './services/orderItems.service';
import { PaginationService } from '../pagination/pagination.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto, UpdateOrderItemDto } from './dto/update-order.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetAllProductDto } from '../products/dto/get-all-product.dto';
import { Auth } from '../auth/decortators/auth.decorator';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private ordersService: OrdersService,
    private orderItemsService: OrderItemsService,
    private paginationService: PaginationService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Auth()
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get()
  @ApiQuery({ name: 'buyerId', required: false, type: 'string' })
  findAll(@Query('buyerId') buyerId: string) {
    return this.ordersService
      .findAll({ buyer: buyerId })
      .populate('items')
      .populate('seller', { name: true })
      .populate({ path: 'items', populate: 'product' })
      .exec();
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

  @Get('items/:itemId')
  findOneItem(@Param('itemId') itemId: string) {
    return this.orderItemsService.findOneById(itemId);
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @Patch('items/:itemId')
  updateItem(
    @Param('itemId') itemId: string,
    @Body() updateOrderDto: UpdateOrderItemDto,
  ) {
    return this.orderItemsService.updateItem(itemId, updateOrderDto);
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @Delete('items/:itemId')
  removeItem(@Param('itemId') itemId: string) {
    return this.orderItemsService.remove(itemId);
  }
}
