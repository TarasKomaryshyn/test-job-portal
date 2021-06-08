import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPassDto {
  @IsNotEmpty()
  @Length(8, 50)
  @ApiProperty({
    example: 'password',
    type: String,
  })
  oldPassword: string;

  @IsNotEmpty()
  @Length(8, 50)
  @ApiProperty({
    example: 'new_password',
    type: String,
  })
  newPassword: string;
}
