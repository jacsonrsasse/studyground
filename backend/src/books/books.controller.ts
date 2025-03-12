import {
  Controller,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AllowedSheetTypesPipe } from './pipes/allowed-sheet-types.pipe';
import { diskStorage } from 'multer';
import { join } from 'path';

@Controller('/books')
export class BooksController {
  @Post('/import')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, '..', '..', '.temp'),
        filename(req, file, callback) {
          callback(null, Date.now() + '-' + file.originalname);
        },
      }),
    }),
  )
  importBooks(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new AllowedSheetTypesPipe()],
      }),
    )
    file: Express.Multer.File,
  ) {
    // precisa salvar o arquivo localmente no projeto em uma pasta temp
    // emitir um evento, acho que CQRS encaixa aqui, ou pode ser com fila usando Bull
    // o handler do evento deverá ler o arquivo em stream e inserir os registros no banco
    // ao finalizar, apagar o arquivo temporário
    return { message: 'Arquivo enviado com sucesso!', file };
  }
}
