import { IsNotEmpty, IsNumber, IsDateString, IsUUID } from 'class-validator';
import { DateTime } from 'luxon';

export class CreateSplitDTO {
  @IsNotEmpty()
  @IsNumber()
  amount: string;

  @IsNotEmpty()
  @IsDateString()
  date: DateTime;

  @IsNotEmpty()
  @IsUUID()
  securityUUID: string;
}
