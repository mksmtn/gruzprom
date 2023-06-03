import { OrderEntity } from '../domain/order.entity';
import { CreateOrderRequest } from './create-order';

export interface OrderDto extends CreateOrderRequest {
  customerId: string;
}

export const OrderDto = {
  fromEntity(entity: OrderEntity): OrderDto {
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
    };
  },
};
