
DROP TABLE IF EXISTS location;
DROP TABLE IF EXISTS weather;
DROP TABLE IF EXISTS trails;


-- create table for location in city_explorer DB
CREATE table location(
    id SERIAL PRIMARY KEY,
    city VARCHAR(255)
    -- latitude VARCHAR(255),
    -- longitude VARCHAR(255),
    -- display_name VARCHAR(255)

);

-- create table for wx in city_explorer DB
CREATE table weather(
    id SERIAL PRIMARY KEY,
    forecast VARCHAR(255),
    date_time VARCHAR(255)

);

-- create table for trails in city_explorer DB
CREATE table trails(
    id SERIAL PRIMARY KEY,
    trail_name VARCHAR(255),
    trail_location VARCHAR(255),
    trail_length VARCHAR(255),
    stars VARCHAR(255),
    star_votes VARCHAR(255),
    summary VARCHAR(255),
    trail_url VARCHAR(255),
    conditions VARCHAR(255),
    condition_date VARCHAR(255)
);

