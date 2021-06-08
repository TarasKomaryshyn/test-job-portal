import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResumeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'My name is Taras and I am 20 years old',
    type: String,
  })
  personalInformation: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'node.js developer',
    type: String,
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'I want to successfully start a carer node.js developer',
    type: String,
  })
  objective: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'I am good with...',
    type: String,
  })
  skills: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'I worked with NestJS for 3 months',
    type: String,
  })
  experience: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example:
      'I am studying in the 3rd year on the specialty of computer engineering',
    type: String,
  })
  education: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example:
      'Ukrainian - native, Russian - advanced, English - Pre-Intermediate',
    type: String,
  })
  languages: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'My hobbies is...',
    type: String,
  })
  hobbies: string;
}
