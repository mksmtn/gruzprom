interface BaseOrderProps {
  id: string;
  date: string;
  time: string;
  contacts: string;
  address: string;
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
