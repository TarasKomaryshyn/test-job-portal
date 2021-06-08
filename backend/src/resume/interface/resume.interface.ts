export interface Resume {
  id: number;
  candidateId: number;
  personalInformation: string;
  title: string;
  objective: string;
  skills: string;
  experience: string;
  education: string;
  languages: string;
  hobbies: string;
  createdAt: Date;
  updatedAt: Date;
}
