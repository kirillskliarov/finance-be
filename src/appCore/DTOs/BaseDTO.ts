import { IsNotEmpty, IsUUID } from 'class-validator';

export class BaseDTO {
  @IsNotEmpty()
  @IsUUID()
  uuid: string;
}
