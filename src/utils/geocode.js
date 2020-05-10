const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYW5qYWxpaGFyaWhyYXJhbiIsImEiOiJjazl5OGVvMDkwMWFzM21sYXdsNjJjMHFjIn0.7PZHtJ1cL2Qkjknk0h_Pxg&limit=1`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to fetch geocode service", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      const place = body.features[0].place_name;
      const lon = body.features[0].center[0];
      const lat = body.features[0].center[1];

      callback(false, { place, lat, lon });
    }
  });
};

module.exports = geocode;
