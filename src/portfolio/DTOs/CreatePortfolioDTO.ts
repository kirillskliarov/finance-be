import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePortfolioDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}
