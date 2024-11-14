const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const mongoose = require("mongoose");
const Models = require("./models");

const app = express();

const Movies = Models.Movie;
const Users = Models.User;

// Allow mongoose to connect to database locally
mongoose.connect("mongodb://127.0.0.1:27017/db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Express static function
app.use(express.static("public"));

//Morgan middleware function
app.use(morgan("common"));

//Attach body Parser
app.use(bodyParser.json());

//creating API endpoints

//Retrieve the list of all movies
app.get(
  "/movies",
  //   passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Movies.find()
      .then((movies) => {
        res.status(200).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//Retreive movie by Title
app.get(
  "/movies/:title",
  // passport.authenticate("jwt", { session: false }),
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

// Retrieve movie by Genre

app.get(
  "/movies/genre/:genreName",
  //  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Movies.findOne({ "Genre.Name": { $regex: req.params.genreName } })
      .then((movie) => {
        res.json(movie.Genre);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//Retrieve movie by Director

app.get(
  "/movies/director/:directorName",
  //passport.authenticate("jwt", { session: false }),
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

//Retrieve all users
app.get("/users", async (req, res) => {
  await Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Register New User

app.post("/users", async (req, res) => {
  //Search to see if user already exist
  await Users.findOne({ Name: req.body.Name })
    .then((user) => {
      if (user) {
        // if user is found then send a respponse that it already exists
        return res.status(400).send(req.body.Name + " already exists");
      } else {
        Users.create({
          Name: req.body.Name,
          Password: req.body.Password,
          Birthday: req.body.Birthday,
          Email: req.body.Email,
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

// Allow User to update user info
app.put("/users/:id", async (req, res) => {
  await Users.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        Name: req.body.Name,
        Email: req.body.Email,
      },
    },
    { new: true }
  )
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(`Error: ${error}`);
    });
});

//Allow users to add Favouritemovie
app.patch("/users/:userID/movies/:MovieID", async (req, res) => {
  const user = await Users.findOne({ _id: req.params.userID });

  if (user.FavoriteMovies.includes(req.params.MovieID)) {
    console.log("Movie is already present in favourites");
    res.json(user);
  } else {
    await Users.findOneAndUpdate(
      { _id: req.params.userID },
      { $push: { FavoriteMovies: req.params.MovieID } },
      { new: true }
    ).then((updatedUser) => {
      res.status(200).json(updatedUser);
    });
  }
});

// Allow user to remove a movie

app.delete("/users/:userID/movies/:movieID", async (req, res) => {
  await Users.findOneAndUpdate(
    { _id: req.params.userID },
    {
      $pull: { FavoriteMovies: req.params.movieID },
    },
    { new: true }
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error:" + error);
    });
});

//Allow existing user to deregister

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

//listens the request
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port " + port);
});
