import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { CustomersEntity } from '../../customers/entity/customers.entity';
import { CandidatesEntity } from '../../candidates/entity/candidates.entity';
import { Vacancy } from '../../vacancies/interface/vacancies.interface';
import { User } from '../../auth/interface/user.interface';

@Entity({ name: 'vacancy_candidates' })
export class VacancyCandidatesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => CustomersEntity)
  @JoinColumn({ name: 'vacancy_id' })
  vacancy: Vacancy;

  @ManyToOne(() => CandidatesEntity)
  @JoinColumn({ name: 'candidate_id' })
  candidate: User;

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
