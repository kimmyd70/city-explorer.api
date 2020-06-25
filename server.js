'use strict';

// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

// Application Setup
const PORT = process.env.PORT || 3000;
const GEOCODE = process.env.GEOCODE;
const WEATHERBIT = process.env.WEATHERBIT;
const TRAILS = process.env.TRAILS;

// instance of express and bring in cors (security/permission "key")
const app = express();
app.use(cors());

//Global vars
let locations = {};

// API Routes
app.get('/', (request, response) => {
  response.send('Welcome!');
});

app.get('/location', (request,response) => {
  let city = request.query.city;

  let API = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE}&q=${city}&format=json`;

  superagent.get(API)
    // .query(queryObject)
    .then((data) => {
      let locationObj = new Location(data.body[0], city);

      // save the city for later
      locations[city] = locationObj;

      // send the city to the user
      response.status(200).json(locationObj);
    })
    .catch(() => {
      response.status(500).send(console.log('Oops.  We\'re confused. Is that a city?'));
    });
});


app.get('/weather', (request, response) => {
  let coords = {
    lat: request.query.latitude,
    lon: request.query.longitude
  };

  let API = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${coords.lat}&lon=${coords.lon}&key=${WEATHERBIT}`;

  superagent.get(API)
  .then ((weather)=>{
    let wxData = weather.body.data.map(obj => {
      return new Weather(obj.weather.description, obj.datetime);

    });
    response.status(200).json(wxData);
  })
  .catch (() => {
    response.status(500).send(console.log('Sorry.  Weather prediction is tricky!'));
  });
});

app.get('/trails', handleTrails);

app.use('*', (request, response) => {
  response.status(404).send('Ummm....');
});


app.use((error, request, response) => {
  response.send('Sorry...we\'re confused');
    
});


// Make sure the server is listening for requests
app.listen(PORT, () => console.log(`I\'m listening on ${PORT}`));


function Location(obj, city) {
  this.formatted_query = obj.display_name;
  this.search_query = city;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
}


function Weather(forecast, time) {
  this.forecast = forecast;
  this.time = new Date(time).toDateString();
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






function locDataFromAPI(city, response) {

}

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
      response.status(500).send('Trail data is not available');
    });
}

//this displays because of movies, trails, etc
function notFoundHandler(request, response) {
  response.status(404).send('Ummm....');
}

