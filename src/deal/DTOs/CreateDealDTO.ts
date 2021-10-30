import { IsDate, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateDealDTO {
  @IsNotEmpty()
  @IsNumber()
  amount: string;

  @IsNotEmpty()
  @IsDate()
  dateTime: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  brokerFee: number;

  @IsNotEmpty()
  @IsNumber()
  exchangeFee: number;

  @IsNotEmpty()
  @IsUUID()
  securityUUID: string;

  @IsNotEmpty()
  @IsUUID()
  currencyUUID: string;

  @IsNotEmpty()
  @IsUUID()
  accountUUID: string;
}
