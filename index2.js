//The same goal from iss.js and index.js, but refactored it with Promises:

const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((flyTimes) => {
    for (let time of flyTimes) {
      const date = new Date(time.risetime * 1000); //when passed a date, the date constructor turns it into current date and local timezone.
      console.log(`Next pass at ${date} for ${time.duration} seconds!`);
    }
  })
  .catch((error) => {
    console.log('It didn\'t work: ', error.message); //Message is extracted from body, it's either success or failure.
  });