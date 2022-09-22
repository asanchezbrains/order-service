import { Entity, PrimaryColumn, Column, OneToMany, JoinTable } from 'typeorm';
import { Order } from './orders.entity';

@Entity('stores')
export class Store {
  @PrimaryColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  user_id: string;

  @Column()
  responsableEmail: string;

  @OneToMany(() => Order, (order) => order.store)
  orders: Order[];
}
