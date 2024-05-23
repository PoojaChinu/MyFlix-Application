const express = require("express");
const morgan = require("morgan");

const app = express();

let topMovies = [
  {
    Name: "The-Hangover",
    Genres: "comedie",
  },
  {
    Name: "Wedding Crashers",
    Genres: "comedie",
  },
  {
    Name: "Taxi",
    Genres: "comedie",
  },
  {
    Name: "The Heat",
    Genres: "comedie ",
  },
  {
    Name: "Hangover",
    Genres: "comedie ",
  },
  {
    Name: "Role Models",
    Genres: "comedie ",
  },
  {
    Name: "Hangover",
    Genres: "comedie ",
  },
  {
    Name: "We are the Millers",
    Genres: "comedie ",
  },
  {
    Name: "Bringing down the house",
    Genres: "comedie ",
  },
  {
    Name: "The Interview",
    Genres: "comedie ",
  },
  {
    Name: "Big Moments",
    Genres: "comedie ",
  },
];

// express static function
app.use(express.static("public"));

// Morgan(Middleware) function
app.use(morgan("common"));

// Creating express routing syntax using Get method

app.get("/movies", (req, res) => {
  res.json(topMovies);
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.get("/", (req, res) => {
  res.send("Welcome to my App!");
});

//Error Handling

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//listens the request
app.listen(8080, () => {
  console.log("Your app is listening to the port");
});
