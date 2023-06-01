export const enum PaymentType {
  Cashless = 'cashless',
  Cash = 'cash',
}

export interface Order {
  id: string;
  date: string;
  time: string;
  address: string;
  contacts: string;
  comment?: string;
  paymentType?: PaymentType;
  moverCount?: number;
}
