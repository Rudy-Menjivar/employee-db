USE employee_db;

INSERT INTO department (name) VALUES
 ('Legal'), ('Engineering'), ('Finance'), ('Management'), ('Sales');

INSERT INTO role (title, salary, department_id) VALUES 
('Legal Team Lead', 250000, 1),
('Lawyer', 180000, 1), 
('Lead Engineer', 150000, 2),
('Software Engineer', 90000, 2),
('Accountant', 120000, 3),
('CEO', 200000, 4),
('Manager', 85000, 4),
('Sales Lead', 110000, 5),
('Salesperson', 75000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Giancarlo', 'Esposito', 6, null),
('Jon', 'Hamm', 7, 1),
('Cristin', 'Milioti', 7, 1),
('Chris', 'Rock', 7, 1),
('Alec', 'Baldwin', 7, 1),
('Pedro', 'Pascal', 3, 2),
('Walter', 'White', 4, 2),
('Tom', 'Hagen', 1, 1),
('Saul', 'Goodman', 2, 1),
('Ted', 'Danson', 5, 2),
('Milana', 'Vayntrub', 8, 3),
('Tania', 'Raymonde', 8, 2),
('Jack', 'Quaid', 9, 5);