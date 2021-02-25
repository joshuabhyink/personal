DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS trips;
DROP TABLE IF EXISTS cart;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(500) NOT NULL
);

CREATE TABLE trips (
    trip_id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES users(user_id);
    date VARCHAR(75) NOT NULL,
    miles_traveled INTEGER NOT NULL,
    outside_temp INTEGER
);

CREATE TABLE cart (
    item_id SERIAL PRIMARY KEY,
    item VARCHAR(50) NOT NULL,
    description VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    quantity INTEGER NOT NULL
);