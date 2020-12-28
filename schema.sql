-- Drops the db if it already exists --
DROP DATABASE IF EXISTS employee_db;

-- Create the database and specified it for use.
CREATE DATABASE employee_db;

USE employee_db;

-- Create the Employee table
CREATE TABLE employee (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id int NOT NULL,
  manager_id int NULL,
  PRIMARY KEY (id)
  FOREIGN KEY (role_id) REFERENCES role(id)
);

-- Create the Department table
CREATE TABLE department (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  PRIMARY KEY (id)
);

-- Create the Role table
CREATE TABLE role (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(30) NOT NULL,
  salary DECIMAL(10,2) NULL,
  department_id int NOT NULL,
  PRIMARY KEY (id)
);