import { Injectable } from '@nestjs/common';
import { CreateOrderRequest } from '../dtos/create-order';
import { Order } from '../dtos/order';

@Injectable()
export class OrderRepository {
  private readonly orders: Order[] = [];

  async create(order: CreateOrderRequest): Promise<Order> {
    const createdOrder = {
      ...order,
      id: this.orders.length.toString(),
    };
    this.orders.push(createdOrder);
    return createdOrder;
  }

  async list(): Promise<Order[]> {
    return this.orders;
  }

  async findById(id: string): Promise<Order | undefined> {
    return this.orders.find((o) => o.id === id);
  }
}
