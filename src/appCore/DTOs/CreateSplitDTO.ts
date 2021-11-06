import { IsNotEmpty, IsNumber, IsDateString, ValidateNested } from 'class-validator';
import { BaseDTO } from './BaseDTO';
import { Type } from 'class-transformer';

export class CreateSplitDTO {
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsDateString()
  dateTime: string;

  @ValidateNested()
  @Type(() => BaseDTO)
  security: BaseDTO;
}
