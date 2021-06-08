import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { CandidatesEntity } from './entity/candidates.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCandidateDto } from './dto/createCandidate.dto';
import * as bcrypt from 'bcrypt';
import { CustomersService } from '../customers/customers.service';
import { User } from '../auth/interface/user.interface';
import { ResetPassword } from './interface/resetPassword.interface';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(CandidatesEntity)
    private candidatesRepository: Repository<CandidatesEntity>,
    @Inject(forwardRef(() => CustomersService))
    private customersService: CustomersService,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.candidatesRepository.findOne({ email });
  }

  async createCandidate(candidate: CreateCandidateDto): Promise<User> {
    const candidateByEmail: User = await this.findByEmail(candidate.email);
    const customerByEmail: User = await this.customersService.findByEmail(
      candidate.email,
    );
    if (candidateByEmail || customerByEmail) {
      const errorMessage = 'User with this email already exists!';
      throw new HttpException(errorMessage, 400);
    }
    candidate.password = await bcrypt.hash(candidate.password, 10);
    return await this.candidatesRepository.save(candidate);
  }

  async resetCandidatePassword(
    passwords: ResetPassword,
    email: string,
  ): Promise<UpdateResult> {
    const isCandidate: User = await this.findByEmail(email);
    if (!isCandidate) {
      const errorMessage = 'You do not have access. Method Not Allowed';
      throw new HttpException(errorMessage, 405);
    }
    const passwordMatch: boolean = await bcrypt.compare(
      passwords.oldPassword,
      isCandidate.password,
    );
    if (!passwordMatch) {
      const errorMessage = 'You entered an incorrect old password!';
      throw new HttpException(errorMessage, 400);
    }
    isCandidate.password = await bcrypt.hash(passwords.newPassword, 10);
    return await this.candidatesRepository.update(isCandidate.id, isCandidate);
  }
}
