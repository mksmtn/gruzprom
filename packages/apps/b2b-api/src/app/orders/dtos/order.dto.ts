import { OrderDto as Dto } from '@gruzprom/api';
import { OrderEntity } from '../domain/order.entity';

export class OrderDto extends Dto {
  static fromEntity(entity: OrderEntity): Dto {
    return {
      id: entity.id,
      date: entity.date,
      time: entity.time,
      address: entity.address,
      contacts: entity.contacts,
      comment: entity.comment,
      moverCount: entity.moverCount,
      moverPrice: entity.moverPrice,
      customerId: entity.customer.id,
      paymentType: entity.paymentType,
      vehicles: entity.vehicles,
    };
  }
}
