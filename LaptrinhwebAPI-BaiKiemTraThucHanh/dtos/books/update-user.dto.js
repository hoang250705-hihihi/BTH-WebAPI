export class UpdateBookDTO {
  constructor({ title, author, total_copies, available_copies }) {
    this.title = title;
    this.author = author;
    this.total_copies = total_copies;
    this.available_copies = available_copies;
  }
}