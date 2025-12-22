CREATE DATABASE course_api CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE course_api;

CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role_id INT NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(20) NOT NULL UNIQUE,
  title VARCHAR(200) NOT NULL,
  credits INT NOT NULL,
  is_open TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE sections (
  id INT PRIMARY KEY AUTO_INCREMENT,
  course_id INT NOT NULL,
  term VARCHAR(20) NOT NULL,
  capacity INT NOT NULL,
  enrolled_count INT NOT NULL DEFAULT 0,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE enrollments (
  user_id INT NOT NULL,
  section_id INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, section_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (section_id) REFERENCES sections(id)
);

INSERT INTO roles(name) VALUES ('admin'), ('student');
