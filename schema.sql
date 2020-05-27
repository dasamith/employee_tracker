create database EmployeeTracker;

use employeetracker;

CREATE TABLE departments (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
   
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id int NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    salary int,
    department_id int,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

create table employee(
	id int NOT NULL auto_increment,
	first_name varchar(50),
    last_name varchar(50),
    role_id int,
    manager_id int,
    primary key (id),
    foreign key (role_id) references departments(id)
);