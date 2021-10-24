import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBrokerDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}
