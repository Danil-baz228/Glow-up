create database if not exists glowup;

use glowup;

create table if not exists user (
                                    user_id int primary key auto_increment,
                                    email varchar(255) not null unique,
    password varchar(255) not null,
    role varchar(255) not null,
    created_at timestamp default current_timestamp,
    last_login timestamp
    );

create table if not exists client (
                                      client_id int primary key auto_increment,
                                      email varchar(255) not null unique,
    phone varchar(255) not null,
    last_name varchar(255) not null,
    first_name varchar(255) not null,
    middle_name varchar(255),
    date_of_birth date,
    address varchar(255),
    user_id int not null,
    foreign key (user_id) references user(user_id)
    );

create table if not exists occupation (
                                          occupation_id int primary key auto_increment,
                                          name varchar(255) not null unique
    );

create table if not exists master (
                                      master_id int primary key auto_increment,
                                      email varchar(255) not null unique,
    phone varchar(255) not null,
    last_name varchar(255) not null,
    first_name varchar(255) not null,
    middle_name varchar(255),
    date_of_birth date,
    education varchar(1000) not null,
    experience date not null,
    user_id int not null,
    occupation_id int not null,
    foreign key (user_id) references user(user_id),
    foreign key (occupation_id) references occupation(occupation_id)
    );

create table if not exists service (
                                       service_id int primary key auto_increment,
                                       name varchar(255) not null unique,
    description varchar(1000),
    price decimal(10, 2) not null,
    duration int not null,
    master_id int not null,
    foreign key (master_id) references master(master_id)
    );

create table if not exists appointment (
                                           appointment_id int primary key auto_increment,
                                           date_start timestamp not null,
                                           date_end timestamp not null,
                                           status varchar(255) not null,
    client_id int not null,
    foreign key (client_id) references client(client_id)
    );

create table if not exists appointment_service (
                                                   appointment_id int not null,
                                                   service_id int not null,
                                                   foreign key (appointment_id) references appointment(appointment_id),
    foreign key (service_id) references service(service_id),
    primary key (appointment_id, service_id)
    );

create table if not exists city (
                                    city_id int primary key auto_increment,
                                    name varchar(255) not null unique
    );

create table if not exists salon (
                                     salon_id int primary key auto_increment,
                                     name varchar(255) not null unique,
    address varchar(255) not null,
    city_id int not null,
    foreign key (city_id) references city(city_id)
    );

create table if not exists salon_master (
                                            salon_id int not null,
                                            master_id int not null,
                                            foreign key (salon_id) references salon(salon_id),
    foreign key (master_id) references master(master_id),
    primary key (salon_id, master_id)
    );

create table if not exists sale (
                                    sale_id int primary key auto_increment,
                                    date_start timestamp not null,
                                    date_end timestamp not null,
                                    name varchar(255) not null,
    sale_amount decimal(10, 2) not null,
    master_id int not null,
    service_id int not null,
    foreign key (master_id) references master(master_id),
    foreign key (service_id) references service(service_id)
    );

create table if not exists review (
                                      review_id int primary key auto_increment,
                                      text varchar(1000) not null,
    rating decimal(2, 1) not null,
    client_id int not null,
    master_id int not null,
    service_id int,
    foreign key (client_id) references client(client_id),
    foreign key (master_id) references master(master_id),
    foreign key (service_id) references service(service_id)
    );
