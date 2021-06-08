import { forwardRef, Module } from '@nestjs/common';
import { CandidatesController } from './candidates.controller';
import { CandidatesService } from './candidates.service';
import { CandidatesEntity } from './entity/candidates.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [
    forwardRef(() => CustomersModule),
    TypeOrmModule.forFeature([CandidatesEntity]),
  ],
  controllers: [CandidatesController],
  providers: [CandidatesService],
  exports: [CandidatesService],
})
export class CandidatesModule {}
