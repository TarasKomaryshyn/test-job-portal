import { HttpException, Injectable } from '@nestjs/common';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResumeEntity } from './entity/resume.entity';
import { Resume } from './interface/resume.interface';
import { CreateResumeDto } from './dto/createResume.dto';
import { CandidatesService } from '../candidates/candidates.service';
import { UserPayload } from './interface/userPayload.interface';
import { User } from '../auth/interface/user.interface';

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(ResumeEntity)
    private resumeRepository: Repository<ResumeEntity>,
    private candidatesService: CandidatesService,
  ) {}

  async findByCandidateId(candidateId: number): Promise<Resume> {
    return await this.resumeRepository
      .createQueryBuilder('resume')
      .where('resume.candidate_id = :id', { id: candidateId })
      .getOne();
  }

  async findByCandidateIdWithoutPassword(candidateId: number): Promise<Resume> {
    return await this.resumeRepository
      .createQueryBuilder('resume')
      .select([
        'resume.personalInformation',
        'resume.title',
        'resume.objective',
        'resume.skills',
        'resume.experience',
        'resume.education',
        'resume.languages',
        'resume.hobbies',
      ])
      .where('resume.candidate_id = :id', { id: candidateId })
      .getOne();
  }

  async getResume(candidate: UserPayload): Promise<Resume> {
    const isCandidate: User = await this.candidatesService.findByEmail(
      candidate.email,
    );
    if (!isCandidate) {
      const errorMessage = 'You do not have access. Method Not Allowed';
      throw new HttpException(errorMessage, 405);
    }
    const existingResume: Resume = await this.findByCandidateIdWithoutPassword(
      candidate.id,
    );
    if (!existingResume) {
      const errorMessage =
        'You do not have a resume yet, you can create it now!';
      throw new HttpException(errorMessage, 400);
    }
    return existingResume;
  }

  async createResume(
    resume: CreateResumeDto,
    candidate: UserPayload,
  ): Promise<InsertResult> {
    const isCandidate: User = await this.candidatesService.findByEmail(
      candidate.email,
    );
    if (!isCandidate) {
      const errorMessage = 'You do not have access. Method Not Allowed';
      throw new HttpException(errorMessage, 405);
    }
    const existingResume = await this.findByCandidateId(candidate.id);
    if (existingResume) {
      const errorMessage =
        'You cannot create more than 1 resume, please update an existing resume!';
      throw new HttpException(errorMessage, 400);
    }
    return await this.resumeRepository
      .createQueryBuilder('resume')
      .insert()
      .into(ResumeEntity)
      .values([
        {
          candidateId: candidate.id,
          personalInformation: resume.personalInformation,
          title: resume.title,
          objective: resume.objective,
          skills: resume.skills,
          experience: resume.experience,
          education: resume.education,
          languages: resume.languages,
          hobbies: resume.hobbies,
        },
      ])
      .execute();
  }

  async updateResume(
    resume: CreateResumeDto,
    candidate: UserPayload,
  ): Promise<UpdateResult> {
    const isCandidate: User = await this.candidatesService.findByEmail(
      candidate.email,
    );
    if (!isCandidate) {
      const errorMessage = 'You do not have access. Method Not Allowed';
      throw new HttpException(errorMessage, 405);
    }
    const existingResume = await this.findByCandidateId(candidate.id);
    if (!existingResume) {
      const errorMessage =
        'Please create a resume first and then you can update it!';
      throw new HttpException(errorMessage, 400);
    }
    return await this.resumeRepository.update(existingResume.id, resume);
  }
}
