import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CustomersEntity } from '../../customers/entity/customers.entity';

@Entity({ name: 'vacancies' })
export class VacanciesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CustomersEntity)
  @JoinColumn({ name: 'customer_id' })
  customerId: number;

  @Column({ name: 'vacancy_name', type: 'varchar' })
  vacancyName: string;

  @Column({ name: 'company', type: 'varchar' })
  company: string;

  @Column({ name: 'city', type: 'varchar' })
  city: string;

  @Column({ name: 'description', type: 'varchar' })
  description: string;

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
