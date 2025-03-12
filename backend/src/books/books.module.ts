import { Module } from '@nestjs/common';
import { BooksResolver } from './books.resolver';
import { BooksController } from './books.controller';
import { AllowedSheetTypesPipe } from './pipes/allowed-sheet-types.pipe';

@Module({
  providers: [BooksResolver, AllowedSheetTypesPipe],
  controllers: [BooksController],
})
export class BooksModule {}
