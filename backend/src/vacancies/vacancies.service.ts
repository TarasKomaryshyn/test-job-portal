import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CandidatesService } from '../candidates/candidates.service';
import { VacanciesEntity } from './entity/vacancies.entity';
import { CustomersService } from '../customers/customers.service';
import { Vacancy } from './interface/vacancies.interface';
import { UserPayload } from '../resume/interface/userPayload.interface';
import { User } from '../auth/interface/user.interface';
import { CreateVacancyDto } from './dto/createVacancy.dto';
import { VacancyCandidatesEntity } from "../vacancyCandidates/entity/vacancyCandidates.entity";

@Injectable()
export class VacanciesService {
  constructor(
    @InjectRepository(VacanciesEntity)
    private vacanciesRepository: Repository<VacanciesEntity>,
    private candidatesService: CandidatesService,
    private customersService: CustomersService,
  ) {}

  async findAllByCustomerId(customerId: number): Promise<Vacancy[]> {
    return await this.vacanciesRepository
      .createQueryBuilder('vacancies')
      .where('vacancies.customer_id = :id', { id: customerId })
      .getMany();
  }

  async getAllVacancies(candidate: UserPayload): Promise<Vacancy[]> {
    const isCandidate: User = await this.candidatesService.findByEmail(
      candidate.email,
    );
    if (!isCandidate) {
      const errorMessage = 'You do not have access. Method Not Allowed';
      throw new HttpException(errorMessage, 405);
    }
    return await this.vacanciesRepository.find();
  }

  async getById(customer: UserPayload, vacancyId: number): Promise<Vacancy> {
    const isCustomer: User = await this.customersService.findByEmail(
      customer.email,
    );
    if (!isCustomer) {
      const errorMessage = 'You do not have access. Method Not Allowed';
      throw new HttpException(errorMessage, 405);
    }
    return await this.findByIdWithoutCustomerId(vacancyId);
  }

  async findByIdWithoutCustomerId(vacancyId: number): Promise<Vacancy> {
    return await this.vacanciesRepository
      .createQueryBuilder('vacancies')
      .select([
        'vacancies.vacancyName',
        'vacancies.company',
        'vacancies.city',
        'vacancies.description',
      ])
      .where('vacancies.id = :id', { id: vacancyId })
      .getOne();
  }

  async findById(vacancyId: number): Promise<Vacancy> {
    return await this.vacanciesRepository
      .createQueryBuilder('vacancies')
      .select([
        'vacancies.vacancyName',
        'vacancies.company',
        'vacancies.city',
        'vacancies.description',
        'customer.id',
      ])
      .where('vacancies.id = :id', { id: vacancyId })
      .leftJoin('vacancies.customerId', 'customer')
      .getOne();
  }

  async findAllByCandidateId(candidateId: number): Promise<Vacancy[]> {
    return await this.vacanciesRepository
      .createQueryBuilder('vacancies')
      .select([
        'vacancies.id',
        'vacancies.vacancyName',
        'vacancies.company',
        'vacancies.city',
        'vacancies.description',
      ])
      .leftJoin(VacancyCandidatesEntity, 'vc', 'vc.vacancyId = vacancies.id')
      .where('vc.candidateId = :id', { id: candidateId })
      .getMany();
  }

  async getVacanciesByCandidateId(candidate: UserPayload): Promise<Vacancy[]> {
    const isCandidate: User = await this.candidatesService.findByEmail(
      candidate.email,
    );
    if (!isCandidate) {
      const errorMessage = 'You do not have access. Method Not Allowed';
      throw new HttpException(errorMessage, 405);
    }
    const existingVacancies: Vacancy[] = await this.findAllByCandidateId(
      candidate.id,
    );
    if (!existingVacancies) {
      const errorMessage = 'You have not yet applied for any vacancy';
      throw new HttpException(errorMessage, 400);
    }
    return existingVacancies;
  }

  async getVacanciesByCustomerId(customer: UserPayload): Promise<Vacancy[]> {
    const isCustomer: User = await this.customersService.findByEmail(
      customer.email,
    );
    if (!isCustomer) {
      const errorMessage = 'You do not have access. Method Not Allowed';
      throw new HttpException(errorMessage, 405);
    }
    const existingVacancies: Vacancy[] = await this.findAllByCustomerId(
      customer.id,
    );
    if (!existingVacancies) {
      const errorMessage =
        'You do not have a vacancy yet, you can create it now!';
      throw new HttpException(errorMessage, 400);
    }
    return existingVacancies;
  }

  async createVacancy(
    vacancy: CreateVacancyDto,
    customer: UserPayload,
  ): Promise<InsertResult> {
    const isCustomer: User = await this.customersService.findByEmail(
      customer.email,
    );
    if (!isCustomer) {
      const errorMessage = 'You do not have access. Method Not Allowed';
      throw new HttpException(errorMessage, 405);
    }
    return await this.vacanciesRepository
      .createQueryBuilder('vacancies')
      .insert()
      .into(VacanciesEntity)
      .values([
        {
          customerId: customer.id,
          vacancyName: vacancy.vacancyName,
          company: vacancy.company,
          city: vacancy.city,
          description: vacancy.description,
        },
      ])
      .execute();
  }

  async updateVacancy(
    vacancy: CreateVacancyDto,
    customer: UserPayload,
    vacancyId: number,
  ): Promise<UpdateResult> {
    const isCustomer: User = await this.customersService.findByEmail(
      customer.email,
    );
    if (!isCustomer) {
      const errorMessage = 'You do not have access. Method Not Allowed';
      throw new HttpException(errorMessage, 405);
    }

    const existingVacancy: Vacancy = await this.findById(vacancyId);
    if (!existingVacancy) {
      const errorMessage = 'Vacancy not found!';
      throw new HttpException(errorMessage, 400);
    }

    const existingVacancyCustomerId: number = parseInt(
      JSON.stringify(existingVacancy.customerId).match(/\d/g).join(''),
    );
    if (existingVacancyCustomerId !== customer.id) {
      const errorMessage = 'You do not have access. Method Not Allowed';
      throw new HttpException(errorMessage, 405);
    } else return await this.vacanciesRepository.update(vacancyId, vacancy);
  }

  async deleteVacancy(
    customer: UserPayload,
    vacancyId: number,
  ): Promise<DeleteResult> {
    const isCustomer: User = await this.customersService.findByEmail(
      customer.email,
    );
    if (!isCustomer) {
      const errorMessage = 'You do not have access. Method Not Allowed';
      throw new HttpException(errorMessage, 405);
    }

    const existingVacancy: Vacancy = await this.findById(vacancyId);
    if (!existingVacancy) {
      const errorMessage = 'Vacancy not found!';
      throw new HttpException(errorMessage, 400);
    }

    const existingVacancyCustomerId: number = parseInt(
      JSON.stringify(existingVacancy.customerId).match(/\d/g).join(''),
    );
    if (existingVacancyCustomerId !== customer.id) {
      const errorMessage = 'You do not have access. Method Not Allowed';
      throw new HttpException(errorMessage, 405);
    } else return await this.vacanciesRepository.delete(vacancyId);
  }
}
