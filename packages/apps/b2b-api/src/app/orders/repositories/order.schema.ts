import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { OrderEntity } from '../domain/order.entity';

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
      comment: entity.comment,
      moverPrice: entity.moverPrice,
      moverCount: entity.moverCount,
      customerId: entity.customer.id,
    };
  }

  static toEntity(model: OrderModel): OrderEntity {
    return OrderEntity.init({
      id: model.id,
      date: model.date,
      time: model.time,
      address: model.address,
      contacts: model.contacts,
      comment: model.comment,
      moverPrice: model.moverPrice,
      moverCount: model.moverCount,
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

  @Prop({ type: String, required: false })
  comment?: string;

  @Prop({ type: Number, required: false, min: 0, max: 99 })
  moverCount?: number;

  @Prop({ type: Number, required: false, min: 0, max: 1_000_000 })
  moverPrice?: number;

  @Prop({ type: String, required: true })
  customerId: string;
}

export const OrderSchema = SchemaFactory.createForClass(OrderModel);
