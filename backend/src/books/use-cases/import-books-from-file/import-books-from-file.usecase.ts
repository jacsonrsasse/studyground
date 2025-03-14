import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { existsSync } from 'fs';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { StartImportBooksFromFileEvent } from 'src/books/events/start-import-books-from-file/start-import-books-from-file.event';
import { EnvService } from 'src/env/env.service';

@Injectable()
export class ImportBooksFromFileUseCase {
  constructor(
    private readonly eventBus: EventBus,
    private readonly envService: EnvService,
  ) {}

  async execute(file: Express.Multer.File) {
    // precisa salvar o arquivo localmente no projeto em uma pasta temp
    // emitir um evento, acho que CQRS encaixa aqui, ou pode ser com fila usando Bull
    // o handler do evento deverá ler o arquivo em stream e inserir os registros no banco
    // ao finalizar, apagar o arquivo temporário

    const tempPath = this.envService.get('TEMP_FOLDER');
    const filename = `${Date.now()}-${file.originalname}`;
    if (!existsSync(tempPath)) {
      await mkdir(tempPath);
    }
    await writeFile(join(tempPath, filename), file.buffer);

    this.eventBus.publish(new StartImportBooksFromFileEvent(filename));

    return true;
  }
}
