### Project Description

The web  application will provide users with access to information about different  movies, directors, and genres. Users will be able to sign up, update their  personal information, and create a list of their favorite movies.

### Features

**Return a list of ALL movies to the user**
**Return data (description, genre, director, image URL, whether it’s featured or not) about a  single movie by title to the user **
**Return data about a genre (description) by name/title (e.g., “Thriller”) **
**Return data about a director (bio, birth year, death year) by name **
**Allow new users to register**
**Allow users to update their user info (username, password, email, date of birth) **
**Allow users to add a movie to their list of favorites **
**Allow users to remove a movie from their list of favorites **
**Allow existing users to deregister **

### Tech Stack

- **Express.js**: Node.js web framework.
- **MongoDB**: NoSQL database.
- **Mongoose**: MongoDB ODM.
- **Passport.js**: Authentication middleware.
- **Swagger**: API documentation tool.
- **Cors**: Cross-Origin Resource Sharing middleware.
- **Bcrypt**: Password hashing.

### Project Setup

The API assumes that you have Node.js installed on your OS already for it to work, if not you can download [Node.js](https://nodejs.org/en) here. Be sure to download the one with (LTS) which stands for Long Term Support. After downloading, click on the installer and follow the instructuions to install Node.js on your computer. After that run `npm install` to install all the dependencies into your project.

Next, create an index.js file where the server will be located.
