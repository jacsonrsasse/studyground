import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { StartImportBooksFromFileEvent } from './start-import-books-from-file.event';

@EventsHandler(StartImportBooksFromFileEvent)
export class StartImportBooksFromFileHandler
  implements IEventHandler<StartImportBooksFromFileEvent>
{
  handle(event: StartImportBooksFromFileEvent) {
    console.log(`Processando arquivo ${event.filename}`);
  }
}
