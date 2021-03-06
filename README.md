# City-Explorer

**Author**: Kim Damalas
**Version**: 3.0.0 (Initial, Lab 6, Lab 7 versions)

## Overview
In general, City Explorer provides the user a way to search a city for pertinent info.For my portion, this project builds the back-end data capture and transfer to support front-end requests

## Getting Started
The user must have a server.js built that fulfills the front-end requests.  The user also needs the code deployed to heroku or other platform unless he/she launches a localhost node server to run the code on the local machine. The user will need to install all the dependency files in npm install and check installation inside package.json if the user pulls down the code onto a local machine.

## Architecture
This project uses constructors to build data objects and  `app.get()` methods to handle data requests from the front end. It started with a javascript server accessing "fake data" in .json files.  We then moved to accessing data on open-source APIs.  Finally, we added an SQL database to provide persisting data that had already been captured once with an API search.

## Change Log
Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:

06-18-20 9:09pm - Application now has a fully-functional express server, with a GET route for the location resource.

06-24-20 2:50pm - Application now has a fully-functional  GET route for the weather and error handling. (all Lab 6 Trello cards complete)

06-24-20 ..... working on refactor for API data and incorporating superagent proxy

07-02-20 6:30-9pm - Finished Movie function
07-04-20 12pm-2:57pm - Added Yelp and Pagination

## Credits and Collaborations
I heavily relied on John's demo code to build the initial server including locations. I heavily relied on Ray's in-class demo to fix my weather route. I relied on the code review of Chris Bortel's server to inform the API build.  Ashley Casimir helped me fix Trails constructor (although I still don't know why mine didn't work). Ryan Geddes gave me the code to pull TMDB poster images.


lab-06-repository
   ├── data
   |     ├── weather.json
   |     └── location.json
   ├── .env
   ├── .eslintrc.json
   ├── .gitignore
   ├── package-lock.json
   ├── package.json
   └── server.js

User Acceptance Tests
Time Estimate
For each of the features listed below, make an estimate of the time it will take you to complete the feature, and record your start and finish times for that feature:

## Lab-06
### Trello Card #1--repo setup

Estimate of time needed to complete: 30 min

Start time: 8:00

Finish time: 8:35

Actual time needed to complete: 35 min


### Trello Card #2--locations

Estimate of time needed to complete: 30 min

Start time: 8:35

Finish time: 9:09

Actual time needed to complete: 34 min


### Trello Card #3--weather

Estimate of time needed to complete: 30 min

Start time: 9:09

Finish time: 9:49 +++ (2 more days in spurts)

Actual time needed to complete: Oh goodness so much time!! And there was 
much celebrating when it worked.


### Trello Card #4--errors

Estimate of time needed to complete: 30 min

Start time: ??

Finish time: ??

Actual time needed to complete: this was done on first day of weather troubleshooting


## Lab 07

### Trello Card #1--data formatting

Estimate of time needed to complete: 15 min

Start time: 9:40

Finish time: 10:38

Actual time needed to complete: 58 min (with location and weather)

### Trello Card #2--user-input location

Estimate of time needed to complete: 30 min

Start time: 9:40

Finish time: 10:38

Actual time needed to complete: 58 min (with data format and weather)

### Trello Card #3--weather any location

Estimate of time needed to complete: 30 min

Start time: 9:40

Finish time: 10:42

Actual time needed to complete: 1 hr 2min (with location and data format)

### Trello Card #4--Trails

Estimate of time needed to complete: 30 min

Start time: 10:45

Finish time: 11:45

Actual time needed to complete: 1 hour....but it felt like soooo much more chasing down
a stupid error!

## Lab 08

### Trello Card #1--database setup

Estimate of time needed to complete: 30 min

Start time: 8:00pm

Finish time: 9:15pm

Actual time needed to complete: 1 hr 15 min -- probs starting POSTGRES

### Trello Card #2--check if location exists in dbase

Estimate of time needed to complete: 

Start time: 

Finish time: 

Actual time needed to complete: 

### Trello Card #3--deploy dbase to heroku 

Estimate of time needed to complete: 

Start time: 

Finish time: 

Actual time needed to complete: 

## Lab 09

### Trello Card #1--add Movies

Estimate of time needed to complete: 1 hr

Start time: 10am

Finish time: 11am

Actual time needed to complete: 1 hour plus initial 30 min on 1 Jul

### Trello Card #2--add Yelp

Estimate of time needed to complete: 1 hr

Start time: 12pm

Finish time: 1:45pm

Actual time needed to complete: 1 hr 45 min

### Trello Card #3--add Pagination

Estimate of time needed to complete: 1 hr

Start time: 2pm

Finish time: 2:45pm

Actual time needed to complete: 45min
