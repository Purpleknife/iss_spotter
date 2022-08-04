const request = require('request');

const fetchMyIP = function(callback) {

  const URL = 'https://api.ipify.org?format=json'; //Fetch JSON API.
  request(URL, (error, response, body) => {
    if (error) {
      error = 'Could not retrieve your IP address.';
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) { //Check HTTP status for a 200, because a 200 response is cacheable by default.
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const IP = JSON.parse(body).ip; //Fetch the value of ip in our object.
    callback(null, IP);

  });
};


const fetchCoordsByIP = function(IP, callback) {

  const URL = `http://ipwho.is/${IP}`;
  request(URL, (error, response, body) => {
    if (error) {
      error = 'Could not retrieve your coordinates.';
      callback(error, null);
      return;
    }

    const data = JSON.parse(body);

    if (!data.success) {
      const msg = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      callback(Error(msg), null);
      return;
    }

    const coordinates = { latitude: data.latitude, longitude: data.longitude };
    callback(null, coordinates);
  });
};


const fetchISSFlyOverTimes = function(coordinates, callback) {

  const URL = `https://iss-pass.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`;
  request(URL, (error, response, body) => {
    if (error) {
      error = 'Could not retrieve ISS fly over times for your coordinates.';
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) { //Check HTTP status for a 200, because a 200 response is cacheable by default.
      const msg = `Status Code ${response.statusCode} when fetching ISS fly over times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    const flyTimes = data.response; //The fly times are in the array 'response'.

    callback(null, flyTimes);

  });
};


const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, IP) => {
    if (error) {
      error = 'Could not retrieve your IP address.';
      callback(error, null);
      return;
    }
    fetchCoordsByIP(IP, (error, coordinates) => {
      if (error) {
        error = 'Could not retrieve your coordinates.';
        callback(error, null);
        return;
      }
      fetchISSFlyOverTimes(coordinates, (error, flyTimes) => {
        if (error) {
          error = 'Could not retrieve ISS fly over times for your coordinates.';
          callback(error, null);
          return;
        }
        callback(null, flyTimes);
      });
    });
  });
};


module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};