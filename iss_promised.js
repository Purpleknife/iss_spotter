//The same goal from iss.js and index.js, but refactored it with Promises:

const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  const data = JSON.parse(body);
  const IP = data.ip;

  return request(`http://ipwho.is/${IP}`);
};

const fetchISSFlyOverTimes = function(body) {
  const data = JSON.parse(body);
  const coordinates = { latitude: data.latitude, longitude: data.longitude };
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coordinates.latitude}&lon=${coordinates.longitude}`);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(body => {
      const data = JSON.parse(body);
      const flyTimes = data.response;
      return flyTimes;
    });
};

module.exports = { nextISSTimesForMyLocation };