export class CreateUserDTO {
  constructor({ id, full_name, email, password_hash,role_id }) {
    this.id = id;
    this.full_name = full_name;
    this.email = email;
    this.password_hash = password_hash;
    this.role_id = role_id;
  }
}
