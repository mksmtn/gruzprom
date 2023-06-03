import { CreateOrderRequest } from '../../dtos/create-order';
import { Customer } from '../../dtos/customer';

export class CreateOrderCommand {
  constructor(
    public readonly order: CreateOrderRequest,
    public readonly customer: Customer
  ) {}
}
