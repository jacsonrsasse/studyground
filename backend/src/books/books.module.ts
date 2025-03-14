import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SseModule } from 'src/sse/sse.module';

import { BooksResolver } from './books.resolver';
import { BooksController } from './books.controller';
import { AllowedSheetTypesPipe } from './pipes/allowed-sheet-types.pipe';
import { BookUseCases } from './use-cases';
import { BookEventHandlers } from './events';

@Module({
  imports: [CqrsModule, SseModule],
  providers: [
    BooksResolver,
    AllowedSheetTypesPipe,
    ...BookUseCases,
    ...BookEventHandlers,
  ],
  controllers: [BooksController],
})
export class BooksModule {}
