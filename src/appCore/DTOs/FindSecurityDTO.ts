import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SecurityType } from '../entities/SecurityType';

export class FindSecurityDTO {
  @IsOptional()
  @IsString()
  secidLike: string;

  @IsOptional()
  @IsEnum(SecurityType)
  type: string;
}
