const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const uuid = require("uuid");

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

let users = [
  {
    id: 1,
    name: "Kin",
    favoriteMovies: ["The Mummy"],
  },
  {
    id: 2,
    name: "Joe",
    favoriteMovies: ["Alien"],
  },
];

let movies = [
  {
    id: 1,
    Title: "Alien",
    Description:
      "The film follows the crew of the commercial space tug Nostromo, who, after coming across a mysterious derelict spaceship on an uncharted planetoid, find themselves up against a deadly and aggressive extraterrestrial loose within their vessel.",
    Genre: {
      Name: "Horror, Sci-Fi",
      Discription:
        "The film follows the crew of the commercial space tug Nostromo, who, after coming across a mysterious derelict spaceship on an uncharted planetoid,",
    },
    Director: {
      Name: "Ridley Scott",
      Bio: "Ridley Scott is pretty incredible. He’s been nominated for Best Director three times but is not merely resting on his laurels.",
      BirthYear: "1969",
    },
  },
  {
    id: 2,
    Title: "Aliens",
    Description:
      "Set in the far future, it stars Sigourney Weaver as Ellen Ripley, the sole survivor of an alien attack on her ship. When communications are lost with a human colony on the moon where her crew first saw the alien creatures, Ripley agrees to return to the site with a unit of Colonial Marines to investigate.",
    Genre: {
      Name: "Action, Adventure",
      Discription:
        "The film follows the crew of the commercial space tug Nostromo, who, after coming across a mysterious derelict spaceship on an uncharted planetoid,",
    },
    Director: {
      Name: "James Cameron",
      Bio: "Ridley Scott is pretty incredible. He’s been nominated for Best Director three times but is not merely resting on his laurels.",
      BirthYear: "1969",
    },
  },
  {
    id: 3,
    Title: "The Mummy",
    Description:
      "The film follows adventurer Rick O'Connell as he travels to Hamunaptra, the City of the Dead, with librarian Evelyn Carnahan and her older brother Jonathan, where they accidentally awaken Imhotep, a cursed high priest with supernatural powers.",
    Genre: {
      Name: "Action, Adventure, Horror",
      Discription:
        "The film follows the crew of the commercial space tug Nostromo, who, after coming across a mysterious derelict spaceship on an uncharted planetoid,",
    },
    Director: {
      Name: "Stephen Sommers",
      Bio: "Ridley Scott is pretty incredible. He’s been nominated for Best Director three times but is not merely resting on his laurels.",
      BirthYear: "1969",
    },
  },
  {
    id: 4,
    Title: "Starship Troopers",
    Description:
      "Set in the 23rd century, the story follows teenager Johnny Rico and his friends serving in the military of the United Citizen Federation, an Earth world government engaged in interstellar war with an alien species of Arachnids.",
    Genre: {
      Name: "Science Fiction, Action",
      Discription:
        "The film follows the crew of the commercial space tug Nostromo, who, after coming across a mysterious derelict spaceship on an uncharted planetoid,",
    },
    Director: {
      Name: "Paul Verhoeven",
      Bio: "Ridley Scott is pretty incredible. He’s been nominated for Best Director three times but is not merely resting on his laurels.",
      BirthYear: "1969",
    },
  },
  {
    id: 5,
    Title: "Battle: Los Angeles",
    Description:
      "The story follows a Marine staff sergeant played by Aaron Eckhart who leads a platoon of U.S. Marines, joined by other stranded military personnel, defending Los Angeles from alien invasion.",
    Genre: {
      Name: "Action, Adventue, Sci-Fi",
      Discription:
        "The film follows the crew of the commercial space tug Nostromo, who, after coming across a mysterious derelict spaceship on an uncharted planetoid,",
    },
    Director: {
      Name: "Jonathan Liebesman",
      Bio: "Ridley Scott is pretty incredible. He’s been nominated for Best Director three times but is not merely resting on his laurels.",
      BirthYear: "1969",
    },
  },
  {
    id: 6,
    Title: "The Last Voyage of the Demeter",
    Description:
      "Its plot follows the doomed crew of the merchant ship Demeter led by Captain Elliot who attempt to survive the treacherous ocean voyage from Transylvania to London while being stalked by a legendary vampire known as Dracula",
    Genre: {
      Name: "Fantasy, Horror",
      Discription:
        "The film follows the crew of the commercial space tug Nostromo, who, after coming across a mysterious derelict spaceship on an uncharted planetoid,",
    },
    Director: {
      Name: "André Øvredal",
      Bio: "Ridley Scott is pretty incredible. He’s been nominated for Best Director three times but is not merely resting on his laurels.",
      BirthYear: "1969",
    },
  },
  {
    id: 7,
    Title: "Avatar",
    Description:
      " It is set in the mid-22nd century, when humans are colonizing Pandora, a lush habitable moon of a gas giant in the Alpha Centauri star system, in order to mine the valuable mineral unobtanium,[a] the room-temperature superconductor mineral. The expansion of the mining colony threatens the continued existence of a local tribe of Na'vi, a humanoid species indigenous to Pandora.",
    Genre: {
      Name: "Action, Adventure, Sci-Fi",
      Discription:
        "The film follows the crew of the commercial space tug Nostromo, who, after coming across a mysterious derelict spaceship on an uncharted planetoid,",
    },
    Director: {
      Name: "James Cameron",
      Bio: "Ridley Scott is pretty incredible. He’s been nominated for Best Director three times but is not merely resting on his laurels.",
      BirthYear: "1969",
    },
  },
  {
    id: 8,
    Title: "Dungeons & Dragons: Honor Among Thieves",
    Description:
      "A charming thief and a band of unlikely adventurers embark on an epic quest to retrieve a lost relic, but things go dangerously awry when they run afoul of the wrong people.",
    Genre: {
      Name: "Adventure, Fantasy, Comedy",
      Discription:
        "The film follows the crew of the commercial space tug Nostromo, who, after coming across a mysterious derelict spaceship on an uncharted planetoid,",
    },
    Director: {
      Name: "Jonathan Goldstein",
      Bio: "Ridley Scott is pretty incredible. He’s been nominated for Best Director three times but is not merely resting on his laurels.",
      BirthYear: "1969",
    },
  },
  {
    id: 9,
    Title: "A",
    Description: "T",
    Genre: {
      Name: "H",
      Discription:
        "The film follows the crew of the commercial space tug Nostromo, who, after coming across a mysterious derelict spaceship on an uncharted planetoid,",
    },
    Director: {
      Name: "r",
      Bio: "Ridley Scott is pretty incredible. He’s been nominated for Best Director three times but is not merely resting on his laurels.",
      BirthYear: "1969",
    },
  },
  {
    id: 10,
    Title: "A",
    Description: "T",
    Genre: {
      Name: "H",
      Discription:
        "The film follows the crew of the commercial space tug Nostromo, who, after coming across a mysterious derelict spaceship on an uncharted planetoid,",
    },
    Director: {
      Name: "r",
      Bio: "Ridley Scott is pretty incredible. He’s been nominated for Best Director three times but is not merely resting on his laurels.",
      BirthYear: "1969",
    },
  },
];
// express static function
app.use(express.static("public"));

// Morgan(Middleware) function
app.use(morgan("common"));

// attach bodyparser
app.use(bodyParser.json());

// Creating express routing syntax using Get method

// app.get("/movies", (req, res) => {
//   res.json(topMovies);
// });

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.get("/", (req, res) => {
  res.send("Welcome to my App!");
});

// Creating API endpoints

// Read list of all movies
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

// Read data about single movie by title

app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("no such movie");
  }
});

// Read data about genre
app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find((movie) => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("no such genre");
  }
});

// Read data about director

app.get("/movies/directors/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(
    (movie) => movie.Director.Name === directorName
  ).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("no such director");
  }
});

app.get("/users", (req, res) => {
  res.status(200).json(users);
});

// Create user to register

app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("users need names");
  }
});

// Update user info

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("no such user");
  }
});

// Add movie to the user list of their favorites
app.patch("/users/:userId/favorites/:movieId", (req, res) => {
  const { userId, movieId } = req.params;

  let user = users.find((user) => user.id == userId);
  let movie = movies.find((movie) => movie.id == movieId);

  if (user) {
    user.favoriteMovies.push(movie.Title);
    res
      .status(200)
      .send(`Movie Id: ${movieId} has been added to user ${userId}'s array`);
  } else {
    res.status(400).send("no such user");
  }
});

// Delete movie to their list of favouirtes
app.delete("/users/:userId/favorites/:movieId", (req, res) => {
  const { userId, movieId } = req.params;

  let user = users.find((user) => user.id == userId);
  let movie = movies.find((movie) => movie.id == movieId);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      (title) => title !== movie.Title
    );

    res
      .status(200)
      .send(
        `Movie Id: ${movieId} has been removed from user ${userId}'s array`
      );
  } else {
    res.status(400).send("no such user");
  }
});

// Delete users to deregister
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    users = users.filter((user) => user.id != id);
    res.status(200).send(`user ${id} has been deleted`);
  } else {
    res.status(400).send("no such user");
  }
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
