import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { CandidatesEntity } from '../../candidates/entity/candidates.entity';
import { User } from '../../auth/interface/user.interface';

@Entity({ name: 'resume' })
export class ResumeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => CandidatesEntity)
  @JoinColumn({ name: 'candidate_id' })
  candidateId: number;

  @Column({ name: 'personal_information', type: 'varchar' })
  personalInformation: string;

  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({ name: 'objective', type: 'varchar' })
  objective: string;

  @Column({ name: 'skills', type: 'varchar' })
  skills: string;

  @Column({ name: 'experience', type: 'varchar' })
  experience: string;

  @Column({ name: 'education', type: 'varchar' })
  education: string;

  @Column({ name: 'languages', type: 'varchar' })
  languages: string;

  @Column({ name: 'hobbies', type: 'varchar' })
  hobbies: string;

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
