import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import * as TaskEither from 'fp-ts/TaskEither';
import * as Either from 'fp-ts/Either';
import * as IO from 'fp-ts/IO';
import { pipe } from 'fp-ts/lib/function';
import { CreateOrderCommand } from '../impl/create-order.command';
import { OrderRepository } from '../../repositories/order.repository';
import { OrderCreatedEvent } from '../../events/impl/order-created.event';
import { OrderEntity } from '../../domain/order.entity';
import { CreateOrderProps } from '../../domain/order.types';
import { InternalServerErrorException } from '@nestjs/common';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: CreateOrderCommand): Promise<void> {
    const createOrderProps: CreateOrderProps = {
      id: command.order.id,
      date: command.order.date,
      time: command.order.time,
      address: command.order.address,
      contacts: command.order.contacts,
      comment: command.order.comment,
      moverCount: command.order.moverCount,
      moverPrice: command.order.moverPrice,
      customer: {
        id: command.customer.id,
        defaultMoverPrice: command.customer.defaultMoverPrice,
      },
    };
    const result = await pipe(
      TaskEither.fromEither(OrderEntity.create(createOrderProps)),
      TaskEither.tap((order) => this.orderRepository.create(order)),
      TaskEither.tapIO((order) =>
        IO.of(this.eventBus.publish(new OrderCreatedEvent(order)))
      ),
      TaskEither.map(() => true as const)
    )();
    if (Either.isLeft(result)) {
      throw new InternalServerErrorException();
    }
  }
}
