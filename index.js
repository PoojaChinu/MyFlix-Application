const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Models = require("./models");
const { check, validationResult } = require("express-validator");

const Movies = Models.Movie;
const Users = Models.User;

const app = express();

// Allow mongoose to connect to database locally
// mongoose.connect("mongodb://localhost:27017/db", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Allow mongoose to connect to databse remotely
mongoose.connect(process.env.CONNECTION_URI, {
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

// CORS in Express
const cors = require("cors");
let allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:1234",
  "http://testsite.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        // If a specific origin isn’t found on the list of allowed origins
        let message =
          "The CORS policy for this application doesn’t allow access from origin " +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);

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
        res.status(200).json(movies);
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
        res.status(200).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// Create user to register

app.post(
  "/users",
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
  [
    check("Name", "Name is required (min length 5)").isLength({ min: 5 }),
    check(
      "Name",
      "Name contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Email", "Email does not appear to be valid").isEmail(),
    check("Password", "Password is required").not().isEmpty(),
    check(
      "Birthday",
      "Birthday does not appear to be valid (only date allowed)"
    ).isDate(),
  ],
  async (req, res) => {
    // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    await Users.findOne({ Name: req.body.Name }) // Search to see if a user with the requested username already exists
      .then((user) => {
        if (user) {
          //If the user is found, send a response that it already exists
          return res.status(400).send(req.body.Name + " already exists");
        } else {
          Users.create({
            Name: req.body.Name,
            Password: hashedPassword,
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
  }
);

// Update user info
app.put(
  "/users/:id",
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
  [
    check("Name", "Name is required (min length 5)").isLength({ min: 5 }),
    check(
      "Name",
      "Name contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check(
      "Birthday",
      "Birthday does not appear to be valid (only date allowed)"
    ).isDate(),
  ],
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    await Users.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          Name: req.body.Name,
          FavoriteMovies: req.body.FavoriteMovies,
          Birthday: req.body.Birthday,
          Email: req.body.Email,
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
    const user = await Users.findOne({ _id: req.params.userID });

    if (user.FavoriteMovies.includes(req.params.MovieID)) {
      console.log("Movie is already present in favorites");

      res.status(200).send("Movie is already present in favorites");
    }

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
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port " + port);
});
