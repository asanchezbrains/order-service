import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { Store } from 'src/entity/stores.entity';
import { Order } from 'src/entity/orders.entity';

@Injectable()
export class OrderService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Store) private storesRepository: Repository<Store>,
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    private readonly httpService: HttpService,
  ) {}

  async findAll(clientEmail: string, request: any): Promise<object> {
    try {
      console.log(clientEmail)

      const limit = 10;
      const offset = request.offset ? request.offset : 0;

      const filter = {
        serviceType: request.service ? request.service : '',
        comuna: request.commune ? request.commune : '',
        estado: request.region ? request.region : '',
      };

      let query = `store.responsableEmail = "${clientEmail}"`

      if (!Object.values(request).every((ele) => ele == '')){
        console.log("con filtros")
        query = `${query} AND( order.serviceType = :serviceType
          OR order.comuna = :comuna
          OR order.estado = :estado)`
      }
      console.log(request);
      const result = await this.ordersRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.store', 'store')
        .where(query, filter)
        .skip(offset * limit)
        .take(limit)
        .getMany();
      console.log(result)
      return result;
    } catch (error) {
      Logger.error(error, OrderService.name);
      throw error;
    }
  }

  async findOne(clientEmail: string, orderId: number): Promise<object> {
    try {
      const result = await this.ordersRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.store', 'store')
        .where(`store.responsableEmail = ${clientEmail}`)
        .andWhere(`order.orderId = ${orderId}`)
        .getMany();

      return result;
    } catch (error) {
      Logger.error(error, OrderService.name);
      throw error;
    }
  }
}
