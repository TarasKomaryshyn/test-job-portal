import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateResumeDto } from './dto/createResume.dto';
import { Resume } from './interface/resume.interface';
import { ResumeService } from './resume.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { InsertResult, UpdateResult } from 'typeorm';

@ApiTags('resume')
@Controller('resume')
export class ResumeController {
  constructor(private resumeService: ResumeService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiBearerAuth('access-token')
  async create(
    @Request() req,
    @Body() resume: CreateResumeDto,
  ): Promise<InsertResult> {
    return await this.resumeService.createResume(resume, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  @ApiBearerAuth('access-token')
  async update(
    @Request() req,
    @Body() resume: CreateResumeDto,
  ): Promise<UpdateResult> {
    return await this.resumeService.updateResume(resume, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth('access-token')
  async findByCandidateId(@Request() req): Promise<Resume> {
    return await this.resumeService.getResume(req.user);
  }
}
