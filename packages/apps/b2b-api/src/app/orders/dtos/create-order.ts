import {
  IsUUID,
  IsString,
  IsOptional,
  IsDateString,
  IsMilitaryTime,
  MinLength,
  Min,
  Max,
} from 'class-validator';

export class CreateOrderRequest {
  @IsUUID()
  id: string;

  @IsDateString()
  date: string;

  @IsMilitaryTime()
  time: string;

  @MinLength(3)
  address: string;

  @MinLength(3)
  contacts: string;

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
}
