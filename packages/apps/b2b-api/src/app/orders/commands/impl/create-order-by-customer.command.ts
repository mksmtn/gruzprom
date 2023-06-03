import { CreateOrderByCustomerRequest } from '@gruzprom/api';
import { CustomerDto } from '../../dtos';

export class CreateOrderByCustomerCommand {
  constructor(
    public readonly order: CreateOrderByCustomerRequest,
    public readonly customer: CustomerDto
  ) {}
}
