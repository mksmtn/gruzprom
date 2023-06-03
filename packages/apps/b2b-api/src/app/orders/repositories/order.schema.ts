import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { OrderEntity } from '../domain/order.entity';
import { PaymentType, VehicleType } from '@gruzprom/api';

export type OrderDocument = HydratedDocument<OrderModel>;

@Schema()
export class OrderModel {
  static fromEntity(entity: OrderEntity): OrderModel {
    return {
      id: entity.id,
      date: entity.date,
      time: entity.time,
      address: entity.address,
      contacts: entity.contacts,
      paymentType: entity.paymentType,
      comment: entity.comment,
      moverPrice: entity.moverPrice,
      moverCount: entity.moverCount,
      customerId: entity.customer.id,
      vehicles: entity.vehicles,
    };
  }

  static toEntity(model: OrderModel): OrderEntity {
    return OrderEntity.init({
      id: model.id,
      date: model.date,
      time: model.time,
      address: model.address,
      contacts: model.contacts,
      paymentType: model.paymentType,
      comment: model.comment,
      moverPrice: model.moverPrice,
      moverCount: model.moverCount,
      vehicles: model.vehicles,
      customer: {
        id: model.customerId,
      },
    });
  }

  @Prop({ type: String, required: true })
  id: string;

  @Prop({ type: String, required: true })
  date: string;

  @Prop({ type: String, required: true })
  time: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String, required: true })
  contacts: string;

  @Prop({ type: String, required: true })
  paymentType: PaymentType;

  @Prop({ type: String, required: false })
  comment?: string;

  @Prop({ type: Number, required: false, min: 0, max: 99 })
  moverCount?: number;

  @Prop({ type: Number, required: false, min: 0, max: 1_000_000 })
  moverPrice?: number;

  @Prop({ type: String, required: true })
  customerId: string;

  @Prop({ type: [String], required: true })
  vehicles: ReadonlyArray<VehicleType>;
}

export const OrderSchema = SchemaFactory.createForClass(OrderModel);
