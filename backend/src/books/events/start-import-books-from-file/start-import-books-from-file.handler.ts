import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { StartImportBooksFromFileEvent } from './start-import-books-from-file.event';
import { EnvService } from 'src/env/env.service';
import { join } from 'path';
import * as ExcelJs from 'exceljs';
import { ImportBooksProgressStatusEvent } from '../import-books-progress-status/import-books-progress-status.event';

@EventsHandler(StartImportBooksFromFileEvent)
export class StartImportBooksFromFileHandler
  implements IEventHandler<StartImportBooksFromFileEvent>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly envService: EnvService,
  ) {}

  async handle(event: StartImportBooksFromFileEvent) {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(
      join(this.envService.get('TEMP_FOLDER'), event.filename),
    );

    const worksheet = workbook.worksheets[0];
    const totalRows = worksheet.actualRowCount - 1;
    let isFirst = true;
    const expectedHeaders = ['name', 'pages', 'author'];

    worksheet.eachRow((row, rowNumber) => {
      if (!row || !row.values || !Array.isArray(row.values)) return;

      const values = row.values.slice(1) as string[];

      if (isFirst) {
        const allFieldsExists = values.every((value) =>
          expectedHeaders.includes(value),
        );
        if (!allFieldsExists) throw new Error('Deu ruim aqui');
        isFirst = false;
        return;
      }

      this.eventBus.publish(
        new ImportBooksProgressStatusEvent(totalRows, rowNumber - 1),
      );

      // const jsonData = expectedHeaders.reduce((acc, key, index) => {
      //   acc[key] = values[index] || null;
      //   return acc;
      // }, {});
    });
  }
}
