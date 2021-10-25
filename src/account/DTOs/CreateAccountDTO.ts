import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAccountDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUUID()
  brokerUUID: string;
}
