import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import CandidateRegister from '@/views/CandidateRegister.vue'
import CustomerRegister from '@/views/CustomersRegister.vue'
import Password from '@/views/Password.vue'
import CustomerVacancies from '@/components/vacancies/CustomerVacancies.vue'
import CandidatesVacancies from '@/components/vacancies/CandidatesVacancies.vue'
import CreateVacancy from '@/components/vacancies/CreateVacancy.vue'
import UpdateVacancy from '@/components/vacancies/UpdateVacancy.vue'
import Resume from '@/components/resume/Resume.vue'
import CreateResume from '@/components/resume/CreateResume.vue'
import UpdateResume from '@/components/resume/UpdateResume.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/customers/register', component: CustomerRegister },
  { path: '/candidates/register', component: CandidateRegister },
  { path: '/password', component: Password },
  { path: '/vacancies/my', component: CustomerVacancies },
  { path: '/vacancies', component: CandidatesVacancies },
  { path: '/vacancies/create', component: CreateVacancy },
  { path: '/vacancies/update/:id', component: UpdateVacancy, props: true },
  { path: '/resume', component: Resume },
  { path: '/resume/create', component: CreateResume },
  { path: '/resume/update', component: UpdateResume },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
