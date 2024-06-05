const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const uuid = require("uuid");
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

// let users = [
//   {
//     _id: 1,
//     Name: "Kin",
//     FavoriteMovies: [3],
//     Birthday: new Date("1985-02-19"),
//   },
//   {
//     _id: 2,
//     Name: "Joe",
//     FavoriteMovies: [1],
//     Birthday: new Date("1978-06-19"),
//   },

//   {
//     _id: 3,
//     Name: "Clara",
//     FavoriteMovies: [11],
//     Birthday: new Date("1956-06-23"),
//   },
//   {
//     _id: 4,
//     Name: "Maria",
//     FavoriteMovies: [5],
//     Birthday: new Date("1978-06-19"),
//   },

//   {
//     _id: 5,
//     Name: "Rachel",
//     FavoriteMovies: [4],
//     Birthday: new Date("1959-08-45"),
//   },
// ];

// let movies = [
//   {
//     _id: 1,
//     Title: "Alien",
//     Description:
//       "The film follows the crew of the commercial space tug Nostromo, who, after coming across a mysterious derelict spaceship on an uncharted planetoid, find themselves up against a deadly and aggressive extraterrestrial loose within their vessel.",
//     Genre: {
//       Name: "Horror, Sci-Fi",
//       Description:
//         "The film follows the crew of the commercial space tug Nostromo, who, after coming across a mysterious derelict spaceship on an uncharted planetoid,",
//     },
//     Director: {
//       Name: "Ridley Scott",
//       Bio: "Ridley Scott is pretty incredible. He’s been nominated for Best Director three times but is not merely resting on his laurels.",
//       BirthYear: "1969",
//     },
//   },
//   {
//     _id: 2,
//     Title: "Aliens",
//     Description:
//       "Set in the far future, it stars Sigourney Weaver as Ellen Ripley, the sole survivor of an alien attack on her ship. When communications are lost with a human colony on the moon where her crew first saw the alien creatures, Ripley agrees to return to the site with a unit of Colonial Marines to investigate.",
//     Genre: {
//       Name: "Action, Adventure",
//       Description:
//         "The film follows the crew of the commercial space tug Nostromo, who, after coming across a mysterious derelict spaceship on an uncharted planetoid,",
//     },
//     Director: {
//       Name: "James Cameron",
//       Bio: "Ridley Scott is pretty incredible. He’s been nominated for Best Director three times but is not merely resting on his laurels.",
//       BirthYear: "1969",
//     },
//   },
//   {
//     _id: 3,
//     Title: "The Mummy",
//     Description:
//       "The film follows adventurer Rick O'Connell as he travels to Hamunaptra, the City of the Dead, with librarian Evelyn Carnahan and her older brother Jonathan, where they accidentally awaken Imhotep, a cursed high priest with supernatural powers.",
//     Genre: {
//       Name: "Action, Adventure, Horror",
//       Description:
//         "The film follows the crew of the commercial space tug Nostromo, who, after coming across a mysterious derelict spaceship on an uncharted planetoid,",
//     },
//     Director: {
//       Name: "Stephen Sommers",
//       Bio: "Ridley Scott is pretty incredible. He’s been nominated for Best Director three times but is not merely resting on his laurels.",
//       BirthYear: "1969",
//     },
//   },
//   {
//     _id: 4,
//     Title: "Starship Troopers",
//     Description:
//       "Set in the 23rd century, the story follows teenager Johnny Rico and his friends serving in the military of the United Citizen Federation, an Earth world government engaged in interstellar war with an alien species of Arachnids.",
//     Genre: {
//       Name: "Science Fiction, Action",
//       Description:
//         "The film follows the crew of the commercial space tug Nostromo, who, after coming across a mysterious derelict spaceship on an uncharted planetoid,",
//     },
//     Director: {
//       Name: "Paul Verhoeven",
//       Bio: "Ridley Scott is pretty incredible. He’s been nominated for Best Director three times but is not merely resting on his laurels.",
//       BirthYear: "1969",
//     },
//   },
//   {
//     _id: 5,
//     Title: "Battle: Los Angeles",
//     Description:
//       "The story follows a Marine staff sergeant played by Aaron Eckhart who leads a platoon of U.S. Marines, joined by other stranded military personnel, defending Los Angeles from alien invasion.",
//     Genre: {
//       Name: "Action, Adventue, Sci-Fi",
//       Description:
//         "The film follows the crew of the commercial space tug Nostromo, who, after coming across a mysterious derelict spaceship on an uncharted planetoid,",
//     },
//     Director: {
//       Name: "Jonathan Liebesman",
//       Bio: "Ridley Scott is pretty incredible. He’s been nominated for Best Director three times but is not merely resting on his laurels.",
//       BirthYear: "1969",
//     },
//   },
//   {
//     _id: 6,
//     Title: "The Last Voyage of the Demeter",
//     Description:
//       "Its plot follows the doomed crew of the merchant ship Demeter led by Captain Elliot who attempt to survive the treacherous ocean voyage from Transylvania to London while being stalked by a legendary vampire known as Dracula",
//     Genre: {
//       Name: "Fantasy, Horror",
//       Description:
//         "The film follows the crew of the commercial space tug Nostromo, who, after coming across a mysterious derelict spaceship on an uncharted planetoid,",
//     },
//     Director: {
//       Name: "André Øvredal",
//       Bio: "Ridley Scott is pretty incredible. He’s been nominated for Best Director three times but is not merely resting on his laurels.",
//       BirthYear: "1969",
//     },
//   },
//   {
//     _id: 7,
//     Title: "Avatar",
//     Description:
//       " It is set in the mid-22nd century, when humans are colonizing Pandora, a lush habitable moon of a gas giant in the Alpha Centauri star system, in order to mine the valuable mineral unobtanium,[a] the room-temperature superconductor mineral. The expansion of the mining colony threatens the continued existence of a local tribe of Na'vi, a humanoid species indigenous to Pandora.",
//     Genre: {
//       Name: "Action, Adventure, Sci-Fi",
//       Description:
//         "The film follows the crew of the commercial space tug Nostromo, who, after coming across a mysterious derelict spaceship on an uncharted planetoid,",
//     },
//     Director: {
//       Name: "James Cameron",
//       Bio: "Ridley Scott is pretty incredible. He’s been nominated for Best Director three times but is not merely resting on his laurels.",
//       BirthYear: "1969",
//     },
//   },
//   {
//     _id: 8,
//     Title: "Dungeons & Dragons: Honor Among Thieves",
//     Description:
//       "A charming thief and a band of unlikely adventurers embark on an epic quest to retrieve a lost relic, but things go dangerously awry when they run afoul of the wrong people.",
//     Genre: {
//       Name: "Adventure, Fantasy, Comedy",
//       Description:
//         "The film follows the crew of the commercial space tug Nostromo, who, after coming across a mysterious derelict spaceship on an uncharted planetoid,",
//     },
//     Director: {
//       Name: "Jonathan Goldstein",
//       Bio: "Ridley Scott is pretty incredible. He’s been nominated for Best Director three times but is not merely resting on his laurels.",
//       BirthYear: "1969",
//     },
//   },
//   {
//     _id: 9,
//     Title: "A",
//     Description: "T",
//     Genre: {
//       Name: "H",
//       Description:
//         "The film follows the crew of the commercial space tug Nostromo, who, after coming across a mysterious derelict spaceship on an uncharted planetoid,",
//     },
//     Director: {
//       Name: "r",
//       Bio: "Ridley Scott is pretty incredible. He’s been nominated for Best Director three times but is not merely resting on his laurels.",
//       BirthYear: "1969",
//     },
//   },
//   {
//     _id: 10,
//     Title: "A",
//     Description: "T",
//     Genre: {
//       Name: "H",
//       Description:
//         "The film follows the crew of the commercial space tug Nostromo, who, after coming across a mysterious derelict spaceship on an uncharted planetoid,",
//     },
//     Director: {
//       Name: "r",
//       Bio: "Ridley Scott is pretty incredible. He’s been nominated for Best Director three times but is not merely resting on his laurels.",
//       BirthYear: "1969",
//     },
//   },
//   {
//     _id: 11,
//     Title: "Monster",
//     Description:
//       " It is set in the mid-22nd century, when humans are colonizing Pandora, a lush habitable moon of a gas giant in the Alpha Centauri star system, in order to mine the valuable mineral unobtanium,[a] the room-temperature superconductor mineral. The expansion of the mining colony threatens the continued existence of a local tribe of Na'vi, a humanoid species indigenous to Pandora.",
//     Genre: {
//       Name: "Adventure, Fantasy, Comedy",
//       Description:
//         "The film follows the crew of the commercial space tug Nostromo, who, after coming across a mysterious derelict spaceship on an uncharted planetoid,",
//     },
//     Director: {
//       Name: "Jonathan Goldstein",
//       Bio: "Ridley Scott is pretty incredible. He’s been nominated for Best Director three times but is not merely resting on his laurels.",
//       BirthYear: "1969",
//     },
//   },
// ];
// express static function
app.use(express.static("public"));

// Morgan(Middleware) function
app.use(morgan("common"));

// attach bodyparser
app.use(bodyParser.json());

// Creating express routing syntax using Get method

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.get("/", (req, res) => {
  res.send("Welcome to my App!");
});

// Creating API endpoints

// Read list of all movies
app.get("/movies", async (req, res) => {
  await Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Read data about single movie by title

app.get("/movies/:title", async (req, res) => {
  await Movies.findOne({ Title: req.params.title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Read data about genre
app.get("/movies/genre/:genreName", async (req, res) => {
  await Movies.findOne({ "Genre.Name": req.params.genreName })
    .then((movie) => {
      res.json(movie.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Read data about director

app.get("/movies/director/:directorName", async (req, res) => {
  await Movies.findOne({ "Director.Name": req.params.directorName })
    .then((movie) => {
      res.json(movie.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Get all users

app.get("/users", async (req, res) => {
  await Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Create user to register

app.post("/users", async (req, res) => {
  await Users.findOne({ Name: req.body.Name })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Name + "already exists");
      } else {
        Users.create({
          Name: req.body.Name,
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

app.put("/users/:id", async (req, res) => {
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
});

// Add movie to the user list of their favorites
app.patch("/users/:userID/movies/:MovieID", async (req, res) => {
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
});

// Delete movie to their list of favouirtes
app.delete("/users/:userID/favorites/:movieID", async (req, res) => {
  await Users.updateOne(
    { _id: req.params.userID },
    {
      $pull: { FavoriteMovies: req.params.movieID },
    }
  )
    .then(() => {
      res.status(200).send(req.params.movieID + " was deleted.");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

// Delete users to deregister
app.delete("/users/:userID", async (req, res) => {
  await Users.findOneAndDelete({ _id: req.params.userID })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.userID + " was not found");
      } else {
        res.status(200).send(req.params.userID + " was deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
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
