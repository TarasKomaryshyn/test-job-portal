import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CandidatesService } from '../candidates/candidates.service';
import { TokenResponse } from './interface/auth.interface';
import { CustomersService } from '../customers/customers.service';
import { User } from './interface/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private candidatesService: CandidatesService,
    private customersService: CustomersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user: User =
      (await this.candidatesService.findByEmail(email)) ||
      (await this.customersService.findByEmail(email));
    if (!user) {
      const errorMessage = 'You entered an incorrect email or password!';
      throw new HttpException(errorMessage, 400);
    }
    const passwordMatch: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    if (!passwordMatch) {
      const errorMessage = 'You entered an incorrect email or password!';
      throw new HttpException(errorMessage, 400);
    } else {
      const userData: User =
        (await this.candidatesService.findByEmail(user.email)) ||
        (await this.customersService.findByEmail(user.email));
      return userData;
    }
  }

  public async generateAccessToken(user: User): Promise<string> {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    return this.jwtService.signAsync(payload);
  }

  async login(user: User): Promise<TokenResponse> {
    return { access_token: await this.generateAccessToken(user) };
  }

  async getRole(user: User): Promise<string | unknown> {
    const candidate: User = await this.candidatesService.findByEmail(
      user.email,
    );
    if (candidate) {
      return { role: 'candidate' };
    }
    const customer: User = await this.customersService.findByEmail(user.email);
    if (customer) {
      return { role: 'customer' };
    }
    return null;
  }
}
