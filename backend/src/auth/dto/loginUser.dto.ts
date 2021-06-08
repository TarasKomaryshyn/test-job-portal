import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'taraskomaryshyn@gmail.com',
    type: String,
  })
  email: string;

  @IsNotEmpty()
  @Length(8, 50)
  @ApiProperty({
    example: 'password',
    type: String,
  })
  password: string;
}
