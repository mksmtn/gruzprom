import * as Either from 'fp-ts/Either';
import { CreateOrderProps, OrderProps } from './order.types';

export class OrderEntity {
  private constructor(private readonly props: OrderProps) {}

  /**
   * Create a new order if `create` properties are valid
   */
  static create(create: CreateOrderProps): Either.Either<string, OrderEntity> {
    const props: OrderProps = {
      ...create,
      moverPrice: create.moverPrice ?? create.customer.defaultMoverPrice,
    };
    const order = new OrderEntity(props);
    return Either.right(order);
  }

  /**
   * Simply instanciate an existing order using it's props
   *
   * The typical use of the function is to create an instance
   * of `OrderEntity` from an existing database record.
   * This method does not perform any validation, nor does
   * it have any logic.
   */
  static init(props: OrderProps): OrderEntity {
    return new OrderEntity(props);
  }

  get id() {
    return this.props.id;
  }

  get date() {
    return this.props.date;
  }

  get time() {
    return this.props.time;
  }

  get address() {
    return this.props.address;
  }

  get contacts() {
    return this.props.contacts;
  }

  get comment() {
    return this.props.comment;
  }

  get paymentType() {
    return this.props.paymentType;
  }

  get vehicles() {
    return this.props.vehicles;
  }

  get moverPrice() {
    return this.props.moverPrice;
  }

  get moverCount() {
    return this.props.moverCount;
  }

  get customer() {
    return this.props.customer;
  }
}
