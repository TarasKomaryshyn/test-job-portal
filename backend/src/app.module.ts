import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { CandidatesModule } from './candidates/candidates.module';
import { ResumeModule } from './resume/resume.module';
import { VacanciesModule } from './vacancies/vacancies.module';
import { VacancyCandidatesModule } from './vacancyCandidates/vacancyCandidates.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CustomersModule,
    CandidatesModule,
    ResumeModule,
    VacanciesModule,
    VacancyCandidatesModule,
    TypeOrmModule.forRoot(),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
