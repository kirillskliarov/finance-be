import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseDTO } from './BaseDTO';

export class CreateInOutDTO {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ValidateNested()
  @Type(() => BaseDTO)
  account: BaseDTO;
}
