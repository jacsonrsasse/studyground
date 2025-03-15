export class ImportBooksProgressStatusEvent {
  constructor(
    public totalRows: number,
    public currentRow: number,
  ) {}
}
