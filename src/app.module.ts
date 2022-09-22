import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { HealthModule } from './health/health.module';
import { OrderModule } from './order/order.module';
import configuration from './config/configuracion';
import { Store } from './entity/stores.entity';
import { Order } from './entity/orders.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        port: config.get('database.port'),
        host: config.get('database.host'),
        username: config.get('database.username'),
        password: config.get('database.password'),
        database: config.get('database.database'),
        entities: [Store, Order],
        synchronize: false,
      }),
    }),
    HealthModule,
    OrderModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
