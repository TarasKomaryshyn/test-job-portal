import {
  Body,
  Controller,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/createCustomer.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../auth/interface/user.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateResult } from 'typeorm';
import { ResetPassDto } from '../candidates/dto/resetPassword.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Post('registration')
  async create(@Body() customer: CreateCustomerDto): Promise<User> {
    return await this.customerService.createCustomer(customer);
  }

  @UseGuards(JwtAuthGuard)
  @Put('password')
  @ApiBearerAuth('access-token')
  async resetPass(
    @Body() passwords: ResetPassDto,
    @Request() req,
  ): Promise<UpdateResult> {
    return await this.customerService.resetCustomerPassword(
      passwords,
      req.user.email,
    );
  }
}
