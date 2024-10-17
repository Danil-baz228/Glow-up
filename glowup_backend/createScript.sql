CREATE DATABASE IF NOT EXISTS glowup;

USE glowup;

CREATE TABLE IF NOT EXISTS user (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    avatar_url VARCHAR(255)
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
    background_url VARCHAR(255),
    user_id INT NOT NULL,
    occupation_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (occupation_id) REFERENCES occupation(occupation_id)
);

CREATE TABLE IF NOT EXISTS favorite_master (
    client_id INT NOT NULL,
    master_id INT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES client(client_id),
    FOREIGN KEY (master_id) REFERENCES master(master_id),
    PRIMARY KEY (client_id, master_id)
);

CREATE TABLE IF NOT EXISTS post (
    post_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    order_index INT NOT NULL,
    image_links JSON,
    master_id INT NOT NULL,
    FOREIGN KEY (master_id) REFERENCES master(master_id)
);

CREATE TABLE IF NOT EXISTS category (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS service (
    service_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL UNIQUE,
    description VARCHAR(280),
    benefits VARCHAR(250),
    contraindications VARCHAR(280),
    price DECIMAL(10, 2) NOT NULL,
    duration INT NOT NULL,
    image_url VARCHAR(255),
    category_id INT NOT NULL,
    master_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category(category_id),
    FOREIGN KEY (master_id) REFERENCES master(master_id)
);

CREATE TABLE IF NOT EXISTS appointment (
    appointment_id INT PRIMARY KEY AUTO_INCREMENT,
    date_start TIMESTAMP NOT NULL,
    date_end TIMESTAMP NOT NULL,
    status VARCHAR(255) NOT NULL,
    client_id INT NOT NULL,
    service_id INT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES client(client_id),
    FOREIGN KEY (service_id) REFERENCES service(service_id)
);


CREATE TABLE IF NOT EXISTS state (
    state_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS city (
    city_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    state_id INT NOT NULL,
    FOREIGN KEY (state_id) REFERENCES state(state_id)
);

CREATE TABLE IF NOT EXISTS salon (
    salon_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    address VARCHAR(255) NOT NULL,
    zip_code VARCHAR(255) NOT NULL,
    city_id INT NOT NULL,
    FOREIGN KEY (city_id) REFERENCES city(city_id)
);

CREATE TABLE IF NOT EXISTS master_salon (
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
    rating INT NOT NULL,
    comment VARCHAR(300) NOT NULL,
    date TIMESTAMP NOT NULL,
    client_id INT NOT NULL,
    appointment_id INT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES client(client_id),
    FOREIGN KEY (appointment_id) REFERENCES appointment(appointment_id)
);