import { Vacancy } from '../../vacancies/interface/vacancies.interface';
import { User } from "../../auth/interface/user.interface";

export interface VacancyCandidates {
  id: number;
  vacancy: Vacancy;
  candidate: User;
  createdAt: Date;
  updatedAt: Date;
}
