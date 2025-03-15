import { ImportBooksProgressStatusHandler } from './import-books-progress-status/import-books-progress-status.handler';
import { StartImportBooksFromFileHandler } from './start-import-books-from-file/start-import-books-from-file.handler';

export const BookEventHandlers = [
  StartImportBooksFromFileHandler,
  ImportBooksProgressStatusHandler,
];
