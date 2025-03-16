import { Module } from '@nestjs/common';
import { MakeMockController } from './make-mock.controller';
import { MakeMockBooksXlsxUseCase } from './use-cases/make-mock-books-xlsx.usecase';

@Module({
  controllers: [MakeMockController],
  providers: [MakeMockBooksXlsxUseCase],
})
export class MakeMockModule {}
