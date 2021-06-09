import { Module } from '@nestjs/common';
import { VacanciesController } from './vacancies.controller';
import { VacanciesService } from './vacancies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from '../customers/customers.module';
import { VacanciesEntity } from './entity/vacancies.entity';
import { CandidatesModule } from '../candidates/candidates.module';

@Module({
  imports: [
    CustomersModule,
    CandidatesModule,
    TypeOrmModule.forFeature([VacanciesEntity]),
  ],
  controllers: [VacanciesController],
  providers: [VacanciesService],
  exports: [VacanciesService],
})
export class VacanciesModule {}
