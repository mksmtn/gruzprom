import {
  IsUUID,
  IsString,
  IsOptional,
  IsDateString,
  IsMilitaryTime,
  MinLength,
  Min,
  Max,
  IsEnum,
  ArrayMaxSize,
} from 'class-validator';
import { VehicleType } from './vehicle-type';
import { PaymentType } from './payment-type';

export class CreateOrderByCustomerRequest {
  @IsUUID()
  id!: string;

  @IsDateString()
  date!: string;

  @IsMilitaryTime()
  time!: string;

  @MinLength(3)
  address!: string;

  @MinLength(3)
  contacts!: string;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @Min(0)
  @Max(1_000_000)
  moverPrice?: number;

  @IsOptional()
  @Min(0)
  @Max(99)
  moverCount?: number;

  @IsOptional()
  @ArrayMaxSize(5)
  @IsEnum(VehicleType, { each: true })
  vehicles: ReadonlyArray<VehicleType> = [];

  @IsEnum(PaymentType)
  paymentType!: PaymentType;
}
