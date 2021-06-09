import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { CandidatesEntity } from '../../candidates/entity/candidates.entity';
import { VacanciesEntity } from '../../vacancies/entity/vacancies.entity';

@Entity({ name: 'vacancy_candidates' })
@Unique(['vacancyId', 'candidateId'])
export class VacancyCandidatesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => VacanciesEntity)
  @JoinColumn({ name: 'vacancy_id' })
  vacancyId: number;

  @ManyToOne(() => CandidatesEntity)
  @JoinColumn({ name: 'candidate_id' })
  candidateId: number;

  @CreateDateColumn({
    nullable: true,
    name: 'created_at',
    select: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
    name: 'updated_at',
    select: false,
  })
  updatedAt: Date;
}
