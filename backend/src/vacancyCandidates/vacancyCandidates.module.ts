import { Module } from '@nestjs/common';
import { CandidatesModule } from '../candidates/candidates.module';
import { VacanciesModule } from '../vacancies/vacancies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacancyCandidatesController } from './vacancyCandidates.controller';
import { VacancyCandidatesService } from './vacancyCandidates.service';
import { VacancyCandidatesEntity } from './entity/vacancyCandidates.entity';

@Module({
  imports: [
    CandidatesModule,
    VacanciesModule,
    TypeOrmModule.forFeature([VacancyCandidatesEntity]),
  ],
  controllers: [VacancyCandidatesController],
  providers: [VacancyCandidatesService],
  exports: [VacancyCandidatesService],
})
export class VacancyCandidatesModule {}
