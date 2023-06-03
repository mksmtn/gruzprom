import { PaymentType, VehicleType } from '@gruzprom/api';

interface BaseOrderProps {
  id: string;
  date: string;
  time: string;
  contacts: string;
  address: string;
  paymentType: PaymentType;
  vehicles: ReadonlyArray<VehicleType>;
  comment?: string;
  moverCount?: number;
  moverPrice?: number;
}

export interface CreateOrderProps extends Readonly<BaseOrderProps> {
  customer: Readonly<{
    id: string;
    defaultMoverPrice?: number;
  }>;
}

export type OrderProps = Readonly<BaseOrderProps> &
  Readonly<{ customer: Readonly<{ id: string }> }>;
