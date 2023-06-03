import { Injectable } from '@nestjs/common';
import * as TaskEither from 'fp-ts/TaskEither';
import * as Option from 'fp-ts/Option';
import { OrderEntity } from '../domain/order.entity';
import { OrderModel } from './order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { pipe } from 'fp-ts/lib/function';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(OrderModel.name) private readonly orderModel: Model<OrderModel>
  ) {}

  create(order: OrderEntity): TaskEither.TaskEither<string, true> {
    const dbEntity = OrderModel.fromEntity(order);
    return pipe(
      TaskEither.tryCatch(
        () => this.orderModel.create(dbEntity),
        (reason) => {
          if (reason instanceof Error) {
            return reason.message;
          }
          return 'Unable to save order to the database';
        }
      ),
      TaskEither.map(() => true as const)
    );
  }

  list(): TaskEither.TaskEither<string, OrderEntity[]> {
    return pipe(
      TaskEither.tryCatch(
        () => this.orderModel.find(),
        () => 'Unable to get orders from the database'
      ),
      TaskEither.map((docs) => docs.map(OrderModel.toEntity))
    );
  }

  findById(
    id: string
  ): TaskEither.TaskEither<string, Option.Option<OrderEntity>> {
    return pipe(
      TaskEither.tryCatch(
        () => this.orderModel.findOne({ id }),
        () => 'Unable to get an order from the database'
      ),
      TaskEither.map((docOrUndefined) =>
        docOrUndefined ? Option.some(docOrUndefined) : Option.none
      ),
      TaskEither.map((docOption) => Option.map(OrderModel.toEntity)(docOption))
    );
  }
}
