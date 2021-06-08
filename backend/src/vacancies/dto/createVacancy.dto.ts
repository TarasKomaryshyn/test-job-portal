import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVacancyDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Junior node.js developer',
    type: String,
  })
  vacancyName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'InventorSoft',
    type: String,
  })
  company: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Chernivtsi',
    type: String,
  })
  city: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'We are looking for...',
    type: String,
  })
  description: string;
}
