import { Module } from '@nestjs/common';
import { BooksResolver } from './books.resolver';
import { BooksController } from './books.controller';
import { AllowedSheetTypesPipe } from './pipes/allowed-sheet-types.pipe';
import { BookUseCases } from './use-cases';
import { BookEventHandlers } from './events';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  providers: [
    BooksResolver,
    AllowedSheetTypesPipe,
    ...BookUseCases,
    ...BookEventHandlers,
  ],
  controllers: [BooksController],
})
export class BooksModule {}
