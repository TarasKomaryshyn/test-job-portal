import {
  Body,
  Controller,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/createCandidate.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../auth/interface/user.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ResetPassDto } from './dto/resetPassword.dto';
import { UpdateResult } from 'typeorm';

@ApiTags('candidates')
@Controller('candidates')
export class CandidatesController {
  constructor(private candidatesService: CandidatesService) {}

  @Post('registration')
  async createCandidate(@Body() candidate: CreateCandidateDto): Promise<User> {
    return await this.candidatesService.createCandidate(candidate);
  }

  @UseGuards(JwtAuthGuard)
  @Put('password')
  @ApiBearerAuth('access-token')
  async resetPass(
    @Body() passwords: ResetPassDto,
    @Request() req,
  ): Promise<UpdateResult> {
    return await this.candidatesService.resetCandidatePassword(
      passwords,
      req.user.email,
    );
  }
}
