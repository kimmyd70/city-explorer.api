'use strict';

//test variable
let allMovies = [];

// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');

// Application Setup
const PORT = process.env.PORT || 3000;
const GEOCODE = process.env.GEOCODE;
const WEATHERBIT = process.env.WEATHERBIT;
const HIKING = process.env.HIKING;
const MOVIES = process.env.MOVIES;
const YELP = process.env.YELP;

// instance of express and bring in cors (security/permission "key")
const app = express();
const client = new pg.Client(process.env.DATABASE_URL);
app.use(cors());

//check to see if client is connected
client.connect()
  .then(() => console.log('we are in business'))
  .catch((error) => console.error('problems!', error));

//Global vars
let locations = {};

// app.get('/add', (request, response) =>{
// //get info from the front end user input
// const city = request.query.city;
// // const latitude = request.query.latitude;
// // const longitude = request.query.longitude;
// // const display_name = request.query.display_name;

// //create safe query with variables -- very useful if username/pword, etc
// // const safeQuery = [city, latitude, longitude, display_name];
// const safeQuery = [city];
// // const SQL = `INSERT INTO location (city, latitude, longitude, display_name) VALUES ($1, $2, $3, $4);`

// const SQL = `INSERT INTO location (city) VALUES ($1);`


// //give SQL query to our pg agent
// client.query(SQL, safeQuery)
//   .then(output =>{
//     response.status(200).json(output);
//   })
//   .catch(error => {response.status(500).send(error)});
// });

// API Routes
app.get('/', (request, response) => {
  response.send('Welcome!');
});

app.get('/location', (request,response) => {
  let city = request.query.city;

//   //if SQL contains => response(pull from SQL)
  // let SQL = `SELECT * FROM location WHERE city=request.query.city`;
  // if (SQL.rows == city){
  //   // return info object
  //     console.log('found it');
  //     let locationObj = new Location(city);
  //     console.log(locationObj);
  //     response.status(200).json(locationObj);

  //   }
  // else {
  //   console.log('not in DB');
    let API = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE}&q=${city}&format=json`;
    superagent.get(API)
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
    // const SQL = `INSERT INTO location (city) VALUES ($1)`;

  // }
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

app.get('/trails', (request,response) => {
  const coords = {
    lat: request.query.latitude,
    lon: request.query.longitude
  };
  let API = `https://www.hikingproject.com/data/get-trails?lat=${coords.lat}&lon=${coords.lon}&maxDistance=10&key=${HIKING}`;

  superagent.get(API)
    .then(trail =>{
      let trails = trail.body.trails.map(obj => {

        //build contract obj with constructor
        return new Trails(obj.name,obj.location,obj.length, obj.stars, obj.starVotes, obj.summary, obj.url, obj.condition_status, obj.conditionDate);

      });
      response.status(200).json(trails);
    })
    .catch(() => {
      response.status(500).send('Sorry, trail data is not available.');
    });


});

app.get('/movies', (request, response) =>{
  let city = request.query.search_query;

  let API = `https://api.themoviedb.org/3/search/movie?query=${city}&api_key=${MOVIES}`;

  superagent.get(API)
    .then(data =>{
      let movies = data.body.results.map(obj => {

        //build contract obj with constructor
        return new Movie(obj.title,obj.overview,obj.vote_average, obj.vote_count, obj.poster_path, obj.popularity, obj.release_date)
      });
      response.status(200).json(movies);
    })
    .catch(() => {
      response.status(500).send('Sorry, movie data is not available.');
    });

});

app.get('/yelp', (request, response)=>{

  let city = request.query.search_query;

  let API = `https://api.yelp.com/v3/businesses/search?location=${city}`
  superagent.get(API)
  .set('Authorization',`Bearer ${YELP}`)
    .then(data => {
      let yelp = data.body.businesses.map(obj =>{
        
        // return new Yelp('yelllow', 'image url', 7, 8, 'object url')
        return new Yelp(obj.name, obj.image_url, obj.price, obj.rating, obj.url)
      });
      response.status(200).json(yelp);
    })
    .catch(() => {
      response.status(500).send ('Sorry, Yelp data is unavailable');
    });

});

//displays because Yelp and Movies are not built
app.use('*', (request, response) => {
  response.status(404).send('Ummm....');
});


app.use((error, request, response) => {
  response.send('Sorry...we\'re confused');
    
});


// Make sure the server is listening for requests
app.listen(PORT, () => console.log(`I\'m listening on ${PORT}`));

// function Location(city){
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

// function Trails(obj) {
//   this.name = obj.name;
//   this.location = obj.location;
//   this.length = obj.length;
//   this.stars = obj.stars;
//   this.star_votes = obj.star_votes;
//   this.summary = obj.summary;
//   this.trail_url = obj.trail_url;
//   this.conditions = obj.conditions;
//   this.condition_date = new Date(obj.conditionDate.slice(0,10)).toDateString();
//   this.condition_time = obj.conditionDate.slice(11,19);
// }

//Help from Ashley Casimir to fix constructor

function Trails (name, location, length, stars, star_votes, summary, trail_url, conditions, conditionDate){
  this.name = name;
  this.location = location;
  this.length = length;
  this.stars = stars;
  this.star_votes = star_votes;
  this.summary = summary;
  this.trail_url = trail_url;
  this.conditions = conditions;
  this.condition_date = new Date(conditionDate.slice(0,10)).toDateString();
  this.condition_time = conditionDate.slice(11,19);
}

function Movie (title, overview, average_votes, total_votes, image_url, popularity, released_on){
  this.title = title;
  this.overview = overview;
  this.average_votes = average_votes;
  this.total_votes = total_votes;
  this.image_url = `https://image.tmdb.org/t/p/original/${image_url}`  ;
  this.popularity = popularity;
  this.released_on = released_on;
}

function Yelp (name, image_url, price, rating, url){
  this.name = name;
  this.image_url = image_url;
  this.price = price;
  this.rating = rating;
  this.url = url;
}
