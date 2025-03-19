import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { StartImportBooksFromFileEvent } from './start-import-books-from-file.event';
import { EnvService } from 'src/libs/env/env.service';
import { join } from 'path';
import * as ExcelJs from 'exceljs';
import { ImportBooksProgressStatusEvent } from '../import-books-progress-status/import-books-progress-status.event';
import { createReadStream, statSync } from 'fs';

@EventsHandler(StartImportBooksFromFileEvent)
export class StartImportBooksFromFileHandler
  implements IEventHandler<StartImportBooksFromFileEvent>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly envService: EnvService,
  ) {}

  async handle(event: StartImportBooksFromFileEvent) {
    const filePath = join(this.envService.get('TEMP_FOLDER'), event.filename);
    const fileSize = statSync(filePath).size;
    const workbook = new ExcelJs.stream.xlsx.WorkbookReader(
      createReadStream(filePath),
      {},
    );
    const expectedHeaders = ['name', 'pages', 'author'];
    let processedBytes = 0;

    for await (const worksheet of workbook) {
      let isFirst = true;

      for await (const row of worksheet) {
        if (!row || !row.values || !Array.isArray(row.values)) continue;

        const values = row.values.slice(1) as string[];
        const rowString = JSON.stringify(values);
        const rowSize = Buffer.byteLength(rowString, 'utf8');
        processedBytes += rowSize;

        if (isFirst) {
          const allFieldsExists = values.every((value) =>
            expectedHeaders.includes(value),
          );
          if (!allFieldsExists) throw new Error('Deu ruim aqui');
          isFirst = false;
          continue;
        }

        const progress = parseFloat(
          ((processedBytes / fileSize) * 100).toFixed(2),
        );
        this.eventBus.publish(
          new ImportBooksProgressStatusEvent(fileSize, progress),
        );
      }

      break;
    }

    this.eventBus.publish(new ImportBooksProgressStatusEvent(fileSize, 100));
  }
}
