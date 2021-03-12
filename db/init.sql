DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS trips;
DROP TABLE IF EXISTS oil;
DROP TABLE IF EXISTS items;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(500) NOT NULL
);

CREATE TABLE trips (
    trip_id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES users(user_id),
    date VARCHAR(75) NOT NULL,
    miles_traveled INTEGER NOT NULL,
    previous_miles INTEGER REFERENCES trips(miles_traveled)
    outside_temp INTEGER
);

CREATE TABLE oil (
    entry_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    original_oil_miles INTEGER NOT NULL,
    previous_oil_miles INTEGER
    oil_miles INTEGER NOT NULL
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    item VARCHAR (50) NOT NULL,
    description VARCHAR (100) NOT NULL,
    price INTEGER NOT NULL,
    img_url VARCHAR (300)
);

CREATE TABLE cart_items (
    cart_items_id SERIAL PRIMARY KEY,
    cart_id INTEGER REFERENCES users(user_id),
    id INTEGER REFERENCES items(id)
);