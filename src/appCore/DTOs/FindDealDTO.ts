import { IsOptional, IsUUID } from 'class-validator';

export class FindDealDTO {
  @IsOptional()
  @IsUUID()
  portfolioUUID: string;
}
