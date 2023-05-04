import { CreateOrderRequest } from '../../dtos/create-order';

export class CreateOrderCommand {
  constructor(public readonly order: CreateOrderRequest) {}
}
