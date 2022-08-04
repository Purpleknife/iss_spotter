const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, flyTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  for (let time of flyTimes) {
    const date = new Date(time.risetime * 1000); //when passed a date, the date constructor turns it into current date and local timezone.
    console.log(`Next pass at ${date} for ${time.duration} seconds!`);
  }
});

//The date constructor from Javascript accepts the number of milliseconds
//as timestamp, not unix time (number of seconds), which is the format of 'risetime'
//So to adjust that, we multiply by 1000.
//Otherwise, it gives the defaulft date: Mon Jan 19 1970.



// ====> Functions we used to test our functions in iss.js, before implementing nextISSTimesForMyLocation:

// const { fetchMyIP } = require('./iss');

// fetchMyIP((error, IP) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', IP);
// });



// const { fetchCoordsByIP } = require('./iss');

// const IP = <YOUR IP>;
// fetchCoordsByIP(IP, (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
  
//   console.log('It worked! Returned coordinates:', coordinates);
// });



// const { fetchISSFlyOverTimes } = require('./iss');

// const coordinates = { latitude: <YOUR LATITUDE>, longitude: <YOUR LONGITUDE> };
// fetchISSFlyOverTimes(coordinates, (error, flyTimes) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
  
//   console.log('It worked! Returned fly over times:', flyTimes);
// });