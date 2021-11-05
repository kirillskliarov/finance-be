import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SecurityType } from '../entities/SecurityType';

export class CreateSecurityDTO {
  @IsNotEmpty()
  @IsString()
  secid: string;

  @IsNotEmpty()
  @IsEnum(SecurityType)
  type: SecurityType;
}
