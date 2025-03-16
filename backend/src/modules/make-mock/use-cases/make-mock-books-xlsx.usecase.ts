import { Injectable } from '@nestjs/common';
import * as ExcelJs from 'exceljs';
import { Response } from 'express';

@Injectable()
export class MakeMockBooksXlsxUseCase {
  async execute(response: Response) {
    const workbook = new ExcelJs.stream.xlsx.WorkbookWriter({
      stream: response,
    });
    const worksheet = workbook.addWorksheet();
    worksheet.addRow(['name', 'author', 'pages']).commit();

    for (let i = 0; i <= 2_000_000; i++) {
      worksheet
        .addRow([`Book ${i}`, `Author ${i}`, Math.floor(Math.random() * 1000)])
        .commit();
    }

    await workbook.commit();
  }
}
