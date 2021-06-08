import { forwardRef, Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersEntity } from './entity/customers.entity';
import { CandidatesModule } from '../candidates/candidates.module';

@Module({
  imports: [
    forwardRef(() => CandidatesModule),
    TypeOrmModule.forFeature([CustomersEntity]),
  ],
  providers: [CustomersService],
  controllers: [CustomersController],
  exports: [CustomersService],
})
export class CustomersModule {}
