import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { VacancyCandidatesService } from './vacancyCandidates.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DeleteResult, InsertResult } from 'typeorm';

@ApiTags('vacancyCandidates')
@Controller('vacancyCandidates')
export class VacancyCandidatesController {
  constructor(private vacancyCandidatesService: VacancyCandidatesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create/:id')
  @ApiBearerAuth('access-token')
  async create(
    @Request() req,
    @Param('id') vacancyId: number,
  ): Promise<InsertResult> {
    return await this.vacancyCandidatesService.create(vacancyId, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  @ApiBearerAuth('access-token')
  async delete(
    @Request() req,
    @Param('id') vacancyId: number,
  ): Promise<DeleteResult> {
    return await this.vacancyCandidatesService.delete(req.user, vacancyId);
  }
}
