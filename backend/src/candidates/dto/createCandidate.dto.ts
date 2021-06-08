import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCandidateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Taras',
    type: String,
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Komaryshyn',
    type: String,
  })
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'candidate@gmail.com',
    type: String,
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 50)
  @ApiProperty({
    example: 'password',
    type: String,
  })
  password: string;
}
