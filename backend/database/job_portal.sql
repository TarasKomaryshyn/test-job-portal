CREATE TABLE "candidates" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "email" varchar UNIQUE,
  "password" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "customers" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "email" varchar UNIQUE,
  "password" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "vacancies" (
  "id" SERIAL PRIMARY KEY,
  "customer_id" int,
  "vacancy_name" varchar,
  "company" varchar,
  "city" varchar,
  "description" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "resume" (
  "id" SERIAL PRIMARY KEY,
  "candidate_id" int,
  "personal_information" varchar,
  "title" varchar,
  "objective" varchar,
  "skills" varchar,
  "experience" varchar,
  "education" varchar,
  "languages" varchar,
  "hobbies" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "vacancy_candidates" (
  "id" SERIAL PRIMARY KEY,
  "vacancy_id" int,
  "candidate_id" int,
  "created_at" timestamp,
  "updated_at" timestamp
);

ALTER TABLE "vacancies" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id");

ALTER TABLE "resume" ADD FOREIGN KEY ("candidate_id") REFERENCES "candidates" ("id");

ALTER TABLE "vacancy_candidates" ADD FOREIGN KEY ("vacancy_id") REFERENCES "vacancies" ("id");

ALTER TABLE "vacancy_candidates" ADD FOREIGN KEY ("candidate_id") REFERENCES "candidates" ("id");