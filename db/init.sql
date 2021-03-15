DROP TABLE IF EXISTS oil_trips;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS oil;
DROP TABLE IF EXISTS trips;
DROP TABLE IF EXISTS users;

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
    outside_temp INTEGER
);

CREATE TABLE oil (
    entry_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    oil_miles INTEGER NOT NULL,
    trip_id INTEGER REFERENCES trips(trip_id)
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