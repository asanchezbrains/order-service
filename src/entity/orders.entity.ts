import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, JoinTable } from 'typeorm';
import { Store } from './stores.entity';

@Entity('orders')
export class Order {
  @PrimaryColumn()
  id: number;

  @Column()
  store_id: string;

  @Column()
  created_at: Date;

  @Column()
  trackingNumber: string;

  @Column()
  customerFullName: string;

  @Column()
  serviceType: string;

  @Column()
  trackingStatus: string;

  @Column()
  estado: string;

  @Column()
  comuna: string;

  @Column()
  ciudad: string;

  @Column()
  orderId: string;

  @ManyToOne(() => Store, (store) => store.orders)
  @JoinColumn({ name: "store_id" })
  store: Store;
}
