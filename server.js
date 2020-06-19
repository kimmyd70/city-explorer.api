'use strict';

// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const { response } = require('express');

// Application Setup
const PORT = process.env.PORT;
const app = express();
app.use(cors());

app.get('/', (request, response) => {
  response.send('Welcome!');
});

app.get('/bad', (request, response) => {
  throw new Error('Not Cool, Dave.  Not Cool!');
});

// The callback can be a separate function. Really makes things readable
app.get('/about', aboutUsHandler);

function aboutUsHandler(request, response) {
  response.status(200).send('About Us Page');
}

// API Routes
app.get('/location', handleLocation);
//this is working
app.get('/weather', handleWeather);

app.use('*', notFoundHandler);
app.use(errorHandler);

// HELPER FUNCTIONS

function handleLocation(request, response) {
  try {
    const geoData = require('./data/location.json');
    const city = request.query.city;
    const locationData = new Location(city, geoData);
    response.send(locationData);
  }
  catch (error) {
    errorHandler('Oops. We\'re confused. Is that a city?', request, response);
  }
}

function Location(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData[0].display_name;
  this.latitude = geoData[0].lat;
  this.longitude = geoData[0].lon;
}

//Does this need to be a loop?
function handleWeather(request, response) {
  // try {
//     const wxData = require('./data/weather.json');
//     const city = request.query.city;
//     const weatherData = [];
//     wxData.weather.forEach(wxData => {
//       weatherData.push(new Weather(city,wxData));
//     });
//  response.send(weatherData);
    // response.send('handler entered');
//   }
//   catch (error) {
//     errorHandler('Oops. We\'re confused. Weather prediction is tricky!', request, response);
//   }
}

//Is the constructor not set up correctly?
function Weather(city, wxData) {
  this.search_query = city;
  // this.time = wxData[0].valid_date;
  // this.forecast = wxData[0].weather.description;
  this.time = '7';
  this.forecast = 'yes';
  response.send('fake data');
}

//this displays because of movies, trails, etc
function notFoundHandler(request, response) {
  response.status(404).send('Ummm....');
}

function errorHandler(error, request, response) {
  response.status(500).send(error);
}



// Make sure the server is listening for requests
app.listen(PORT, () => console.log(`I\'m listening on ${PORT}`));
