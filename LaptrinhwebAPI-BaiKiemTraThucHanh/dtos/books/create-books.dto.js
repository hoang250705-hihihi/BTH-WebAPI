export class CreateBookDTO {
  constructor({ id, title, author, total_copies, available_copies }) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.total_copies = total_copies;
    this.available_copies = available_copies;
  }
}