const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const app = express();
const port = process.env.PORT || 3000;

// Setup handlebars engine and views locaion
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Anjali Hariharan",
  });
  // res.sendFile("about.html", {
  //   root: publicDirPath,
  // });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Anjali Hariharan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Anjali Hariharan",
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Quisque euismod finibus lorem in elementum. Aenean accumsan 
      lacus vitae ante auctor Facilisis. Nulla vel tellus massa. 
      Maecenas convallis sodales tortor, 
      eget placerat magna interdum pellentesque. Etiam mattis neque sem, eget 
      tincidunt lacus tristique quis. Morbi ac elementum metus. Curabitur eu 
      dui vitae felis volutpat pretium ut eu sapien. In iaculis tincidunt augue 
      sit amet dapibus. Sed mattis justo quis turpis tempus, in dictum mi semper. 
      Donec vel blandit odio, ac cursus mi. Etiam luctus pharetra laoreet. 
      Maecenas ac turpis leo. Praesent fermentum lorem nec tellus lacinia 
      tincidunt. Nunc tempor nunc tincidunt sollicitudin tincidunt.`,
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({ error: "Please provide address" });
  }

  geocode(address, (error, { place, lat, lon } = {}) => {
    if (error !== false) {
      return res.send({ error });
    }
    forecast(lat, lon, (error, { temperature, feelslike } = {}) => {
      if (error !== false) {
        return res.send({ error });
      }

      res.send({
        place,
        temperature,
        feelslike,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "No search term provided",
    });
  }

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorText: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorText: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`Server up at port ${port}`);
});
