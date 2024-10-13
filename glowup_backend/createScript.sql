CREATE DATABASE IF NOT EXISTS glowup;

USE glowup;

CREATE TABLE IF NOT EXISTS user (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

CREATE TABLE IF NOT EXISTS client (
    client_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    date_of_birth DATE,
    address VARCHAR(255),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS occupation (
    occupation_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS master (
    master_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    gender ENUM('male', 'female', 'other') NOT NULL,
    date_of_birth DATE,
    education VARCHAR(1000) NOT NULL,
    experience DATE NOT NULL,
    avatar_url VARCHAR(255),
    background_url VARCHAR(255),
    user_id INT NOT NULL,
    occupation_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (occupation_id) REFERENCES occupation(occupation_id)
);

CREATE TABLE IF NOT EXISTS service (
    service_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    description VARCHAR(1000),
    price DECIMAL(10, 2) NOT NULL,
    duration INT NOT NULL,
    master_id INT NOT NULL,
    FOREIGN KEY (master_id) REFERENCES master(master_id)
);

CREATE TABLE IF NOT EXISTS appointment (
    appointment_id INT PRIMARY KEY AUTO_INCREMENT,
    date_start TIMESTAMP NOT NULL,
    date_end TIMESTAMP NOT NULL,
    status VARCHAR(255) NOT NULL,
    client_id INT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES client(client_id)
);

CREATE TABLE IF NOT EXISTS appointment_service (
    appointment_id INT NOT NULL,
    service_id INT NOT NULL,
    FOREIGN KEY (appointment_id) REFERENCES appointment(appointment_id),
    FOREIGN KEY (service_id) REFERENCES service(service_id),
    PRIMARY KEY (appointment_id, service_id)
);

CREATE TABLE IF NOT EXISTS city (
    city_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS salon (
    salon_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    address VARCHAR(255) NOT NULL,
    city_id INT NOT NULL,
    FOREIGN KEY (city_id) REFERENCES city(city_id)
);

CREATE TABLE IF NOT EXISTS salon_master (
    salon_id INT NOT NULL,
    master_id INT NOT NULL,
    FOREIGN KEY (salon_id) REFERENCES salon(salon_id),
    FOREIGN KEY (master_id) REFERENCES master(master_id),
    PRIMARY KEY (salon_id, master_id)
);

CREATE TABLE IF NOT EXISTS sale (
    sale_id INT PRIMARY KEY AUTO_INCREMENT,
    date_start TIMESTAMP NOT NULL,
    date_end TIMESTAMP NOT NULL,
    name VARCHAR(255) NOT NULL,
    sale_amount DECIMAL(10, 2) NOT NULL,
    master_id INT NOT NULL,
    service_id INT NOT NULL,
    FOREIGN KEY (master_id) REFERENCES master(master_id),
    FOREIGN KEY (service_id) REFERENCES service(service_id)
);

CREATE TABLE IF NOT EXISTS review (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(1000) NOT NULL,
    rating DECIMAL(2, 1) NOT NULL,
    client_id INT NOT NULL,
    master_id INT NOT NULL,
    service_id INT,
    FOREIGN KEY (client_id) REFERENCES client(client_id),
    FOREIGN KEY (master_id) REFERENCES master(master_id),
    FOREIGN KEY (service_id) REFERENCES service(service_id)
);