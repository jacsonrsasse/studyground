import {
  Controller,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AllowedSheetTypesPipe } from './pipes/allowed-sheet-types.pipe';
import { ImportBooksFromFileUseCase } from './use-cases/import-books-from-file/import-books-from-file.usecase';

@Controller('/books')
export class BooksController {
  constructor(
    private readonly importBooksFromFileUseCase: ImportBooksFromFileUseCase,
  ) {}

  @Post('/import')
  @UseInterceptors(FileInterceptor('file'))
  async importBooks(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new AllowedSheetTypesPipe()],
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.importBooksFromFileUseCase.execute(file);
    return {
      message: 'Arquivo enviado com sucesso!',
      filename: file.originalname,
    };
  }
}
