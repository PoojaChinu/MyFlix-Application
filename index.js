const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Models = require("./models");

const Movies = Models.Movie;
const Users = Models.User;

const app = express();

// connect to database locally
mongoose.connect("mongodb://localhost:27017/db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// express static function
app.use(express.static("public"));

// Morgan(Middleware) function
app.use(morgan("common"));

// attach bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Authentication
let auth = require("./auth")(app);
const passport = require("passport");
require("./passport");

// Creating express routing syntax using Get method

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.get("/", (req, res) => {
  res.send("Welcome to my App!");
});

// Creating API endpoints

// Read list of all movies
app.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// Read data about single movie by title

app.get(
  "/movies/:title",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Movies.findOne({ Title: req.params.title })
      .then((movie) => {
        res.json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// Read data about genre
app.get(
  "/movies/genre/:genreName",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Movies.findOne({ "Genre.Name": req.params.genreName })
      .then((movie) => {
        res.json(movie.Genre);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// Read data about director

app.get(
  "/movies/director/:directorName",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Movies.findOne({ "Director.Name": req.params.directorName })
      .then((movie) => {
        res.json(movie.Director);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// Get all users

app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// Create user to register

app.post("/users", async (req, res) => {
  await Users.findOne({ Name: req.body.Name })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Name + "already exists");
      } else {
        Users.create({
          Name: req.body.Name,
          Password: req.body.Password,
          FavoriteMovies: req.body.FavoriteMovies,
          Birthday: req.body.Birthday,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

// Update user info

app.put(
  "/users/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          Name: req.body.Name,
          FavoriteMovies: req.body.FavoriteMovies,
          Birthday: req.body.Birthday,
        },
      },
      { new: true }
    ) // This line makes sure that the updated document is returned
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// Add movie to the user list of their favorites
app.patch(
  "/users/:userID/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOneAndUpdate(
      { _id: req.params.userID },
      {
        $push: { FavoriteMovies: req.params.MovieID },
      },
      { new: true }
    )
      // This line makes sure that the updated document is returned
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// Delete movie to their list of favouirtes
app.delete(
  "/users/:userID/favorites/:movieID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.updateOne(
      { _id: req.params.userID },
      {
        $pull: { FavoriteMovies: req.params.movieID },
      }
    )
      .then(() => {
        res
          .status(200)
          .send({ result: `MovieID ${req.params.movieID} was deleted.` });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

// Delete users to deregister
app.delete(
  "/users/:userID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOneAndDelete({ _id: req.params.userID })
      .then((user) => {
        if (!user) {
          res
            .status(400)
            .send({ result: `UserID: ${req.params.userID} was not found` });
        } else {
          res
            .status(200)
            .send({ result: `UserID: ${req.params.userID} was deleted` });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//Error Handling

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//listens the request
app.listen(8080, () => {
  console.log("Your app is listening to the port");
});
