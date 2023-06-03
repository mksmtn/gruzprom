import { CreateOrderByCustomerRequest } from './create-order-by-customer';

export class OrderDto extends CreateOrderByCustomerRequest {
  customerId!: string;
}
