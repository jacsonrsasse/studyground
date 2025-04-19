import { Module } from '@nestjs/common';
import { MakeMockController } from './make-mock.controller';
import { MakeMockBooksXlsxUseCase } from './use-cases/make-mock-books-xlsx.usecase';
import { MakeMockProductsSeedUseCase } from './use-cases/make-mock-products-seed.usecase';
import { PostgresClientModule } from '@libs/postgres/postgres-client.module';

@Module({
  imports: [PostgresClientModule],
  controllers: [MakeMockController],
  providers: [MakeMockBooksXlsxUseCase, MakeMockProductsSeedUseCase],
})
export class MakeMockModule {}
