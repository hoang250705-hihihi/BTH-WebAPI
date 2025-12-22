CREATE DATABASE clinic_api CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE clinic_api;

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

CREATE TABLE doctors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(120) NOT NULL,
  specialty VARCHAR(120) NOT NULL
);

CREATE TABLE schedules (
  id INT PRIMARY KEY AUTO_INCREMENT,
  doctor_id INT NOT NULL,
  work_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

CREATE TABLE appointments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  doctor_id INT NOT NULL,
  appt_date DATE NOT NULL,
  appt_time TIME NOT NULL,
  status ENUM('BOOKED','CANCELLED','DONE') NOT NULL DEFAULT 'BOOKED',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

INSERT INTO roles(name) VALUES ('admin'), ('receptionist'), ('patient');
