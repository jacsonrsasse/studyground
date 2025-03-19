export class ImportBooksProgressStatusEvent {
  constructor(
    public fileSize: number,
    public processedBytes: number,
  ) {}
}
