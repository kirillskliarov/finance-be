import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateInOutDTO {
  @IsNotEmpty()
  @IsNumber()
  amount: string;

  @IsNotEmpty()
  @IsUUID()
  accountUUID: string;
}
