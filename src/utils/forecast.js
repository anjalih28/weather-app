const request = require("postman-request");

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=f8b2c972d40d1d0f69e7b51bec2784c7&query=${encodeURIComponent(
    lat
  )},${encodeURIComponent(lon)}`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to fetch forecast services", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      var temperature = body.current.temperature;
      var feelslike = body.current.feelslike;

      callback(false, { temperature, feelslike });
    }
  });
};

module.exports = forecast;
