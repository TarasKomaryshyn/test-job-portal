import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CustomersEntity } from './entity/customers.entity';
import { CreateCustomerDto } from './dto/createCustomer.dto';
import { CandidatesService } from '../candidates/candidates.service';
import { User } from '../auth/interface/user.interface';
import { ResetPassword } from '../candidates/interface/resetPassword.interface';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomersEntity)
    private customersRepository: Repository<CustomersEntity>,
    @Inject(forwardRef(() => CandidatesService))
    private candidatesService: CandidatesService,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.customersRepository.findOne({ email });
  }

  async createCustomer(customer: CreateCustomerDto): Promise<User> {
    const customerByEmail: User = await this.findByEmail(customer.email);
    const candidateByEmail: User = await this.candidatesService.findByEmail(
      customer.email,
    );
    if (candidateByEmail || customerByEmail) {
      const errorMessage = 'User with this email already exists!';
      throw new HttpException(errorMessage, 400);
    }
    customer.password = await bcrypt.hash(customer.password, 10);
    return await this.customersRepository.save(customer);
  }

  async resetCustomerPassword(
    passwords: ResetPassword,
    email: string,
  ): Promise<UpdateResult> {
    const isCustomer: User = await this.findByEmail(email);
    if (!isCustomer) {
      const errorMessage = 'You do not have access. Method Not Allowed';
      throw new HttpException(errorMessage, 405);
    }
    const passwordMatch: boolean = await bcrypt.compare(
      passwords.oldPassword,
      isCustomer.password,
    );
    if (!passwordMatch) {
      const errorMessage = 'You entered an incorrect old password!';
      throw new HttpException(errorMessage, 400);
    }
    isCustomer.password = await bcrypt.hash(passwords.newPassword, 10);
    return await this.customersRepository.update(isCustomer.id, isCustomer);
  }
}
