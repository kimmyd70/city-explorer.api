'use strict';

// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');

// Application Setup
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());

// API Routes
app.get('/', (request, response) => {
  response.send('Welcome!');
});

// app.get('/location', handleLocation);

app.get('/location', (request,response) => {
  // Read in data that came from an external API
  let locData = require('./data/location.json');
  // Adapt the data to match the contract
  let adaptData = new Location(locData[0]);
  // Send out the adapted data
  response.status(200).json(adaptData);
});

app.get('/weather', (request, response) => {
  let wxData = require('./data/weather.json').data;
  let weatherData = [];
  wxData.forEach(data => {
    let wxObj = new Weather(data.weather.description, data.datetime);
    weatherData.push(wxObj);
  });
  response.status(200).send(weatherData);
});

app.use('*', (request, response) => {
  response.status(404).send('Ummm....');
});


app.use((error, request, response) => {
  response.status(500).send('Sorry...we\'re confused');
    
});


// Make sure the server is listening for requests
app.listen(PORT, () => console.log(`I\'m listening on ${PORT}`));


function Location(obj) {
  this.formatted_query = obj.display_name;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
}


function Weather(forecast, time) {
  this.forecast = forecast;
  this.time = new Date(time).toDateString();
}

//this displays because of movies, trails, etc
function notFoundHandler(request, response) {
  response.status(404).send('Ummm....');
}

