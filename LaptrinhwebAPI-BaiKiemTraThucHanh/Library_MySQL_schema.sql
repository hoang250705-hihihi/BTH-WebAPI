CREATE DATABASE library_api CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE library_api;

CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role_id INT NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE books (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  author VARCHAR(150) NOT NULL,
  total_copies INT NOT NULL DEFAULT 1,
  available_copies INT NOT NULL DEFAULT 1
);

CREATE TABLE loans (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  loan_date DATE NOT NULL,
  due_date DATE NOT NULL,
  status ENUM('BORROWED','RETURNED','OVERDUE') NOT NULL DEFAULT 'BORROWED',
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE loan_items (
  loan_id INT NOT NULL,
  book_id INT NOT NULL,
  qty INT NOT NULL DEFAULT 1,
  PRIMARY KEY (loan_id, book_id),
  FOREIGN KEY (loan_id) REFERENCES loans(id),
  FOREIGN KEY (book_id) REFERENCES books(id)
);

INSERT INTO roles(name) VALUES ('librarian'), ('member');
