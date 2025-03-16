import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { StartImportBooksFromFileEvent } from './start-import-books-from-file.event';
import { EnvService } from 'src/libs/env/env.service';
import { join } from 'path';
import * as ExcelJs from 'exceljs';
import { ImportBooksProgressStatusEvent } from '../import-books-progress-status/import-books-progress-status.event';
import { createReadStream } from 'fs';

@EventsHandler(StartImportBooksFromFileEvent)
export class StartImportBooksFromFileHandler
  implements IEventHandler<StartImportBooksFromFileEvent>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly envService: EnvService,
  ) {}

  async handle(event: StartImportBooksFromFileEvent) {
    const workbook = new ExcelJs.stream.xlsx.WorkbookReader(
      createReadStream(
        join(this.envService.get('TEMP_FOLDER'), event.filename),
      ),
      {},
    );
    const expectedHeaders = ['name', 'pages', 'author'];

    for await (const worksheet of workbook) {
      let isFirst = true;
      let rowNumber = 0;

      for await (const row of worksheet) {
        if (!row || !row.values || !Array.isArray(row.values)) continue;

        const values = row.values.slice(1) as string[];
        rowNumber++;

        if (isFirst) {
          const allFieldsExists = values.every((value) =>
            expectedHeaders.includes(value),
          );
          if (!allFieldsExists) throw new Error('Deu ruim aqui');
          isFirst = false;
          continue;
        }

        this.eventBus.publish(
          new ImportBooksProgressStatusEvent(2_000_000, rowNumber - 1),
        );
      }

      break;
    }
  }
}
