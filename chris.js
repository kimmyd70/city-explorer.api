/* eslint-disable quotes */
"use strict";

// dotenv, express, cors
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const superagent = require("superagent");

// this references the .env file and spits out the port
const PORT = process.env.PORT || 3000;

// Initializes an express server
const app = express();

// tells server to use the cors library the () = everyone
app.use(cors());

// declare routes
app.get('/', handleHomePage);
app.get('/location', handleLocation);
app.get('/weather', handleWeather);
app.get('/trails', handleTrails);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Route Handlers

function handleHomePage(request, response) {
  response.send(`PORT ${PORT} is running`);
}

// In Memory Cache
let locations = {};

function handleLocation(request, response) {

  // request.query.city is what the user typed in...
  // If the database has it ...
  if (locations[request.query.city]) {
    console.log('we have it already...')
    response.status(200).send(locations[request.query.city]);
  }
  else {
    console.log('going to get it');
    fetchLocationDataFromAPI(request.query.city, response);
  }

}

function fetchLocationDataFromAPI(city, response) {

  const API = 'https://us1.locationiq.com/v1/search.php';
  // Query String
  // ?key=${process.env.GEOCODE_API_KEY}&q=${request.query.city}&format=json`;

  let queryObject = {
    key: process.env.GEOCODE_API_KEY,
    q: city,
    format: 'json'
  }

  superagent
    .get(API)
    .query(queryObject)
    .then((data) => {
      let locationObj = new Location(data.body[0], city);

      // save the city for later
      locations[city] = locationObj;

      // send the city to the user
      response.status(200).send(locationObj);
    })
    .catch(() => {
      response.status(500).send(console.log("this is not working "));
    });
}

function Location(obj, city) {
  this.latitude = obj.lat;
  this.longitude = obj.lon;
  this.formatted_query = obj.display_name;
  this.search_query = city;
}

// Volatile Data -- because it changes frequently, we don't cache it.
function handleWeather(request, response) {
  const coordinates = {
    lat: request.query.latitude,
    lon: request.query.longitude,
  };

  // const API = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${coordinates.lat}&long=${coordinates.lon}&days=8&key=${process.env.WEATHER_API_KEY}`;

  const API = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${coordinates.lat}&lon=${coordinates.lon}&days=8`;
  superagent //returned promise
    .get(API)
    // .set("api-key", process.env.WEATHER_API_KEY)
    .then((dataResults) => {
      let results = dataResults.body.data.map((result) => {
        return new Weather(result);
      });
      response.status(200).json(results); //this is the actual promise
    })
    .catch((err) => {
      console.error("Weather api is not working", err);
    });
}

function Weather(obj) {
  this.forecast = obj.weather.description;
  this.time = new Date(obj.datetime).toDateString();
}


// Volatile Data -- because it changes frequently, we don't cache it.
function handleTrails(request, response) {
  const coordinates = {
    lat: request.query.latitude,
    lon: request.query.longitude,
  };
  const API = `https://www.hikingproject.com/data/get-trails?key=${process.env.TRAIL_API_KEY}&lat=${coordinates.lat}&lon=${coordinates.lon}&maxDistance=10`;

  superagent
    .get(API)
    .then((dataResults) => {
      let results = dataResults.body.trails.map((result) => {
        return new Trails(result);
      });
      response.status(200).json(results);
    })
    .catch((err) => {
      console.error("Trail api is not working", err);
    });
}

function Trails(obj) {
  this.name = obj.name;
  this.location = obj.location;
  this.length = obj.length;
  this.stars = obj.stars;
  this.star_votes = obj.star_votes;
  this.summary = obj.summary;
  this.trail_url = obj.url;
  this.conditions = obj.conditionDetails;
  this.condition_date = obj.conditionDate; // I need to take this item, filter it, and then return either side to its respected variable
  this.condition_time = obj.conditionDate;
}


//app.put(), app.delete(), app.post()
app.use("*", (request, response) => {
  // custom message that tells users that eh route does not exist
  response.status(404).send(" 404 error: provide a valid route");
});
// error handler
app.use((error, request, response, next) => {
  response.status(500).send(" 500 error: your server is broken");
});
