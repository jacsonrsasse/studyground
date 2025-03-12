import { FileValidator, Injectable } from '@nestjs/common';
import { IFile } from '@nestjs/common/pipes/file/interfaces';
import { ALLOWED_SHEET_TYPES } from '../constants/allowed-sheet-types';

@Injectable()
export class AllowedSheetTypesPipe extends FileValidator<
  Record<string, any>,
  IFile
> {
  private mimetypes: Array<string>;
  private extensions: Array<string>;

  constructor() {
    super({});

    this.extensions = Object.keys(ALLOWED_SHEET_TYPES);
    this.mimetypes = Object.values(ALLOWED_SHEET_TYPES);
  }

  buildErrorMessage(file: IFile): string {
    return `The file must be on of this valids extensions: ${this.extensions.join(', ')}`;
  }

  isValid(file?: IFile): boolean {
    return !!(file?.mimetype && this.mimetypes.includes(file.mimetype));
  }
}
