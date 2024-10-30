-- Inserting example data into the user table
INSERT INTO user (email, password, role, avatar_url) VALUES
                                                         ('client1@example.com', 'password1', 'client', 'client1_avatar.png'),
                                                         ('master1@example.com', 'password2', 'master', 'master1_avatar.png');

-- Inserting example data into the client table
INSERT INTO client (email, phone, last_name, first_name, middle_name, date_of_birth, address, user_id) VALUES
    ('client1@example.com', '555-1234', 'Doe', 'John', 'A', '1990-01-15', '123 Client St', 1);

-- Inserting example data into the occupation table
INSERT INTO occupation (name) VALUES
                                  ('Hairdresser'),
                                  ('Beautician');

-- Inserting example data into the master table
INSERT INTO master (email, phone, last_name, first_name, middle_name, gender, date_of_birth, background_url, user_id, occupation_id) VALUES
    ('master1@example.com', '555-5678', 'Smith', 'Jane', 'B', 'female', '1985-03-20', 'master_background.jpg', 2, 1);

-- Inserting example data into the favorite_master table
INSERT INTO favorite_master (client_id, master_id) VALUES
    (1, 1);

-- Inserting example data into the post table
INSERT INTO post (title, text, order_index, image_links, master_id) VALUES
    ('New Hair Trends', 'Check out the latest hair trends of 2024!', 1, 'hair_trends.jpg', 1);

-- Inserting example data into the category table
INSERT INTO category (name) VALUES
                                ('Hair Care'),
                                ('Skin Care');

-- Inserting example data into the service table
INSERT INTO service (title, description, benefits, contraindications, price, duration, image_url, category_id, master_id) VALUES
    ('Haircut', 'Professional haircut service', 'Boosts confidence', 'None', 50.00, 60, 'haircut.jpg', 1, 1);

-- Inserting example data into the appointment table
INSERT INTO appointment (date_start, date_end, status, client_id, service_id) VALUES
    ('2024-10-22 10:00:00', '2024-10-22 11:00:00', 'completed', 1, 1);

-- Inserting example data into the state table
INSERT INTO state (name) VALUES
    ('California');

-- Inserting example data into the city table
INSERT INTO city (name, state_id) VALUES
    ('Los Angeles', 1);

-- Inserting example data into the salon table
INSERT INTO salon (name, address, zip_code, city_id) VALUES
    ('Glamour Salon', '456 Beauty Ave', '90001', 1);

-- Inserting example data into the master_salon table
INSERT INTO master_salon (salon_id, master_id) VALUES
    (1, 1);

-- Inserting example data into the sale table
INSERT INTO sale (date_start, date_end, name, sale_amount, master_id, service_id) VALUES
    ('2024-10-01 00:00:00', '2024-10-31 23:59:59', 'October Discount', 10.00, 1, 1);

-- Inserting example data into the review table
INSERT INTO review (rating, comment, date, client_id, appointment_id) VALUES
    (5, 'Amazing service!', '2024-10-22 12:00:00', 1, 1);