import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Store } from 'src/entity/stores.entity';
import { Order } from 'src/entity/orders.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Store,Order]),
    HttpModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
