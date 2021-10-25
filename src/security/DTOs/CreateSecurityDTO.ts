import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSecurityDTO {
  @IsNotEmpty()
  @IsString()
  secid: string;
}
