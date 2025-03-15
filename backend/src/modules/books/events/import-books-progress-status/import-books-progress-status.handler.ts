import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ImportBooksProgressStatusEvent } from './import-books-progress-status.event';
import { SseService } from 'src/libs/sse/sse.service';

@EventsHandler(ImportBooksProgressStatusEvent)
export class ImportBooksProgressStatusHandler
  implements IEventHandler<ImportBooksProgressStatusEvent>
{
  constructor(private readonly sseService: SseService) {}

  handle(event: ImportBooksProgressStatusEvent) {
    this.sseService.sendEvent({
      data: event,
    });
  }
}
