import { Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { MakeMockBooksXlsxUseCase } from './use-cases/make-mock-books-xlsx.usecase';
import { MakeMockProductsSeedUseCase } from './use-cases/make-mock-products-seed.usecase';

@Controller('/make/mock')
export class MakeMockController {
  constructor(
    private readonly makeMockBooksXlsxUseCase: MakeMockBooksXlsxUseCase,
    private readonly makeMockProductsSeedUseCase: MakeMockProductsSeedUseCase,
  ) {}

  @Get('/books/xlsx')
  async makeBooksXlsx(@Res() response: Response) {
    response.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    response.setHeader(
      'Content-Disposition',
      'attachment; filename=books-mock.xlsx',
    );

    return this.makeMockBooksXlsxUseCase.execute(response);
  }

  @Post('/products/seed')
  async makeProductsSeed() {
    return this.makeMockProductsSeedUseCase.execute();
  }
}
