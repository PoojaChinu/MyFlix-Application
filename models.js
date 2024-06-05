const mongoose = require("mongoose");

// Defining Schemas
let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String,
  },
  Director: {
    Name: String,
    Director: String,
  },
});

let userSchema = mongoose.Schema({
  Name: { type: String, required: true },
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  Birthday: Date,
});

//Creating of Models

let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);

// Exporting Models
module.exports.Movie = Movie;
module.exports.User = User;
