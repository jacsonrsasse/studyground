import {
  Controller,
  ParseFilePipe,
  Post,
  Sse,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AllowedSheetTypesPipe } from './pipes/allowed-sheet-types.pipe';
import { ImportBooksFromFileUseCase } from './use-cases/import-books-from-file/import-books-from-file.usecase';
import { SseService } from '../sse/sse.service';

@Controller('/books')
export class BooksController {
  constructor(
    private readonly importBooksFromFileUseCase: ImportBooksFromFileUseCase,
    private readonly sseService: SseService,
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

  @Sse('import/progress')
  sendEvents() {
    return this.sseService.addClient();
  }
}
