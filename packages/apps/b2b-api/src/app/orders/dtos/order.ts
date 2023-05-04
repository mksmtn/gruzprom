import { CreateOrderRequest } from './create-order';

export interface Order extends CreateOrderRequest {
  id: string;
}
