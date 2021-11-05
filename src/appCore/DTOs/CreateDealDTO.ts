import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { BaseDTO } from './BaseDTO';
import { Type } from 'class-transformer';

export class CreateDealDTO {
  @IsNotEmpty()
  @IsNumber()
  amount: string;

  @IsNotEmpty()
  @IsDateString()
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

  @ValidateNested()
  @Type(() => BaseDTO)
  security: BaseDTO;

  @ValidateNested()
  @Type(() => BaseDTO)
  currency: BaseDTO;

  @ValidateNested()
  @Type(() => BaseDTO)
  account: BaseDTO;

  @ValidateNested()
  @Type(() => BaseDTO)
  portfolio: BaseDTO;
}
