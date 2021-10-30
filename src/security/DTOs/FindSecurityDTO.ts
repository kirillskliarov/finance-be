import { IsString } from 'class-validator';

export class FindSecurityDTO {
  @IsString()
  secid: string;
}
