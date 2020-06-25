# City-Explorer

**Author**: Kim Damalas
**Version**: 3.0.0 (Initial, Lab 6, Lab 7 versions)

## Overview
In general, City Explorer provides the user a way to search a city for pertinent info.For my portion, this project builds the back-end data capture and transfer to support front-end requests

## Getting Started
The user must have a server.js built that fulfills the front-end requests.  The user alsoneeds the code deployed to heroku or other platform unless he/she launches a localhost node server to run the code on the local machine. Don't forget to install all the dependency files in npm install and check installation inside package.json

## Architecture
This project uses constructors to build data objects and  `app.get()` methods to handle data requests from the front end. It started with a javascript server accessing "fake data" in .json files.  We then moved to accessing data on open-source APIs.  Finally, we added an SQL database to provide persisting data that had already been captured once with an API search.

## Change Log
Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:

06-18-20 9:09pm - Application now has a fully-functional express server, with a GET route for the location resource.

06-24-20 2:50pm - Application now has a fully-functional  GET route for the weather and error handling. (all Lab 6 Trello cards complete)

06-24-20 ..... working on refactor for API data and incorporating superagent proxy

## Credits and Collaborations
I heavily relied on John's demo code to build the initial server including locations. I heavily relied on Ray's in-class demo to fix my weather route. I relied on the code review of Chris Bortel's server to inform the API build


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

Start time: 2:55

Finish time: _____

Actual time needed to complete: _____

