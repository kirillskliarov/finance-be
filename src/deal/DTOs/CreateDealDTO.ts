import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateDealDTO {
  @IsNotEmpty()
  @IsNumber()
  amount: string;

  @IsNotEmpty()
  @IsNumber()
  price: string;

  @IsNotEmpty()
  @IsNumber()
  brokerFee: string;

  @IsNotEmpty()
  @IsNumber()
  exchangeFee: string;

  @IsNotEmpty()
  @IsUUID()
  securityUUID: string;

  @IsNotEmpty()
  @IsUUID()
  accountUUID: string;
}
