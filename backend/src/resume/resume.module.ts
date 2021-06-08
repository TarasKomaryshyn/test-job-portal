import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumeEntity } from './entity/resume.entity';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { CandidatesModule } from '../candidates/candidates.module';

@Module({
  imports: [CandidatesModule, TypeOrmModule.forFeature([ResumeEntity])],
  providers: [ResumeService],
  controllers: [ResumeController],
})
export class ResumeModule {}
