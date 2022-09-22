import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('/')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/:clientEmail/')
  findAll(@Param('clientEmail') clientEmail: string, @Query() request: any) {
    return this.orderService.findAll(clientEmail, request);
  }
  @Get('/:clientEmail/:orderId')
  findOne(
    @Param('clientEmail') clientEmail: string,
    @Param('orderId') orderId: number,
  ) {
    return this.orderService.findOne(clientEmail, orderId);
  }
}
