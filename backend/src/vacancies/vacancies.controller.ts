import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { VacanciesService } from './vacancies.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { CreateVacancyDto } from './dto/createVacancy.dto';
import { Vacancy } from './interface/vacancies.interface';

@ApiTags('vacancies')
@Controller('vacancies')
export class VacanciesController {
  constructor(private vacanciesService: VacanciesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiBearerAuth('access-token')
  async create(
    @Request() req,
    @Body() vacancy: CreateVacancyDto,
  ): Promise<InsertResult> {
    return await this.vacanciesService.createVacancy(vacancy, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  @ApiBearerAuth('access-token')
  async update(
    @Request() req,
    @Body() vacancy: CreateVacancyDto,
    @Param('id') id: number,
  ): Promise<UpdateResult> {
    return await this.vacanciesService.updateVacancy(vacancy, req.user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  @ApiBearerAuth('access-token')
  async delete(@Request() req, @Param('id') id: number): Promise<DeleteResult> {
    return await this.vacanciesService.deleteVacancy(req.user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth('access-token')
  async findById(@Request() req, @Param('id') id: number): Promise<Vacancy> {
    return await this.vacanciesService.getById(req.user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth('access-token')
  async findAllByCustomerId(@Request() req): Promise<Vacancy[]> {
    return await this.vacanciesService.getVacanciesByCustomerId(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('applied')
  @ApiBearerAuth('access-token')
  async findAllByCandidateId(@Request() req): Promise<Vacancy[]> {
    return await this.vacanciesService.getVacanciesByCandidateId(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  @ApiBearerAuth('access-token')
  async findAll(@Request() req): Promise<Vacancy[]> {
    return await this.vacanciesService.getAllVacancies(req.user);
  }
}
