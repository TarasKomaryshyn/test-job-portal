import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository } from 'typeorm';
import { VacancyCandidatesEntity } from './entity/vacancyCandidates.entity';
import { UserPayload } from '../resume/interface/userPayload.interface';
import { User } from '../auth/interface/user.interface';
import { CandidatesService } from '../candidates/candidates.service';
import { VacanciesService } from '../vacancies/vacancies.service';
import { VacancyCandidates } from './interface/vacancyCandidates.interface';
import { Vacancy } from '../vacancies/interface/vacancies.interface';

@Injectable()
export class VacancyCandidatesService {
  constructor(
    @InjectRepository(VacancyCandidatesEntity)
    private vacancyCandidatesRepository: Repository<VacancyCandidatesEntity>,
    private candidatesService: CandidatesService,
    private vacanciesService: VacanciesService,
  ) {}

  async findByVacancyIdAndCandidateId(
    vacancyId: number,
    candidateId: number,
  ): Promise<VacancyCandidates> {
    return await this.vacancyCandidatesRepository
      .createQueryBuilder('vacancyCandidates')
      .select([
        'vacancyCandidates.id',
        'vacancyCandidates.vacancyId',
        'vacancyCandidates.candidateId',
        'candidate.id',
      ])
      .where('vacancyCandidates.vacancyId = :vacancyId', {
        vacancyId: vacancyId,
      })
      .andWhere('vacancyCandidates.candidateId = :candidateId', {
        candidateId: candidateId,
      })
      .leftJoin('vacancyCandidates.candidateId', 'candidate')
      .getOne();
  }

  async create(
    vacancyId: number,
    candidate: UserPayload,
  ): Promise<InsertResult> {
    const existingCandidate: User = await this.candidatesService.findByEmail(
      candidate.email,
    );
    if (!existingCandidate) {
      const errorMessage = 'Candidate not found!';
      throw new HttpException(errorMessage, 400);
    }
    const existingVacancy: Vacancy = await this.vacanciesService.findById(
      vacancyId,
    );
    if (!existingVacancy) {
      const errorMessage = 'Vacancy not found!';
      throw new HttpException(errorMessage, 400);
    }
    const existingVacancyCandidates: VacancyCandidates =
      await this.findByVacancyIdAndCandidateId(vacancyId, candidate.id);
    if (existingVacancyCandidates) {
      const errorMessage = 'Sorry, but you can only apply for one vacancy once';
      throw new HttpException(errorMessage, 400);
    }
    return await this.vacancyCandidatesRepository
      .createQueryBuilder('resume')
      .insert()
      .into(VacancyCandidatesEntity)
      .values([
        {
          vacancyId: vacancyId,
          candidateId: candidate.id,
        },
      ])
      .execute();
  }

  async delete(
    candidate: UserPayload,
    vacancyId: number,
  ): Promise<DeleteResult> {
    const existingCandidate: User = await this.candidatesService.findByEmail(
      candidate.email,
    );
    if (!existingCandidate) {
      const errorMessage = 'Candidate not found!';
      throw new HttpException(errorMessage, 400);
    }
    const existingVacancy: Vacancy = await this.vacanciesService.findById(
      vacancyId,
    );
    if (!existingVacancy) {
      const errorMessage = 'Vacancy not found!';
      throw new HttpException(errorMessage, 400);
    }
    const existingVacancyCandidate: VacancyCandidates =
      await this.findByVacancyIdAndCandidateId(vacancyId, candidate.id);
    if (!existingVacancyCandidate) {
      const errorMessage = 'Vacancy for which you have applied not found!';
      throw new HttpException(errorMessage, 400);
    }
    const existingVacancyCandidateId: number = parseInt(
      JSON.stringify(existingVacancyCandidate.candidateId)
        .match(/\d/g)
        .join(''),
    );
    if (existingVacancyCandidateId !== candidate.id) {
      const errorMessage = 'You do not have access. Method Not Allowed';
      throw new HttpException(errorMessage, 405);
    } else
      return await this.vacancyCandidatesRepository.delete(
        existingVacancyCandidate.id,
      );
  }
}
