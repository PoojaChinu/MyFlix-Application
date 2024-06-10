### Software Developer : Pooja Porwal

### Project Description:

The web  application will provide users with access to information about different  movies, directors, and genres. Users will be able to sign up, update their  personal information, and create a list of their favorite movies. Data are stored in MongoDB, this means you have to work with just two collections namely movies collection and users collection in a database.

### Tech Stack

- [Node.js](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

### Project Setup

The API assumes that you have Node.js installed on your OS already for it to work, if not you can download [Node.js](https://nodejs.org/en) here. Be sure to download the one with (LTS) which stands for Long Term Support. After downloading, click on the installer and follow the instructuions to install Node.js on your computer. After that run `npm install` to install all the dependencies into your project.

You will need dependencies to make this project work like Passport.js, JSON web token (JWT) and a host of other. You will be building your own project so you could ass as many as more depencies as you want but what you will need for this API to work are already in the package.json file.

Next, create an index.js file where the server will be located.

After that, you can create and enpoint and then add listern with a console log that will print on the console when the server is connected and running sucessfully or return an error if something is properly set up.

If you use a mockup movie data, after starting the server, if you go to localhost:8080 on your browser you should see a list of movies displayed on your screen.

### Request types of Movies

There is basically one HTTP request type for movies.

- **GET Requests/Endpoints:**

  - '/movies' `Returns all movies in the list`.
  - '/movies/:title' `Returns a single movie`.
  - '/movies/genre/generName' `Returns a specific Genre details by genre name`.
  - '/movies/director/directorName' `Returns a specific Director details by name.` .

#### Example JSON GET movies return type

<blockquote>
<pre>
[
    { "Genre": { "Name": "Action, Adventure", "Description": "The film
          follows the crew of the commercial space tug Nostromo, who, after
          coming across a mysterious derelict spaceship on an uncharted
          planetoid," }, "Director": { "Name": "James Cameron", "Bio": "Ridley
          Scott is pretty incredible. He’s been nominated for Best Director
          three times but is not merely resting on his laurels.", "BirthYear":
          "1969" }, "_id": "665e21bf0f85f47b51ae4d6b", "Title": "Aliens",
          "Description": "Set in the far future, it stars Sigourney Weaver as
          Ellen Ripley, the sole survivor of an alien attack on her ship. When
          communications are lost with a human colony on the moon where her crew
          first saw the alien creatures, Ripley agrees to return to the site
          with a unit of Colonial Marines to investigate." },

          { "Genre": { "Name": "Science Fiction, Action", "Description": "The
          film follows the crew of the commercial space tug Nostromo, who, after
          coming across a mysterious derelict spaceship on an uncharted
          planetoid," }, "Director": { "Name": "Paul Verhoeven", "Bio": "Ridley
          Scott is pretty incredible. He’s been nominated for Best Director
          three times but is not merely resting on his laurels.", "BirthYear":
          "1969" }, "_id": "665e21bf0f85f47b51ae4d6d", "Title": "Starship
          Troopers", "Description": "Set in the 23rd century, the story follows
          teenager Johnny Rico and his friends serving in the military of the
          United Citizen Federation, an Earth world government engaged in
          interstellar war with an alien species of Arachnids." }

{ "Name": "Action, Adventure", "Description": "The film follows the
crew of the commercial space tug Nostromo, who, after coming across a
mysterious derelict spaceship on an uncharted planetoid," }

{ "Name": "Jonathan Goldstein", "Bio": "Ridley Scott is pretty
incredible. He’s been nominated for Best Director three times but is
not merely resting on his laurels.", "BirthYear": "1969" }]

</pre>
</blockquote>

### Request Type for Users

The HTTP request type for users include the all major request type for performing CRUD operations. GET, POST, PUT and DELETE.

- **GET Requests/Endpoints:**

  - '/users' `Returns list of all users in the database.`
  - '/users/:Username' `Returns a single user by name`.

- **POST Requests/Endpooints:**

  - '/users' `Add new user to the database`
  - '/users/:Username/movies/:MovieID' `Add a movie to user's favorite movie list`.

- **PUT Request/Endpoint:**

  - '/users/:Username' `Update user data`

- **DELETE Requests/Endpoint:**
  - '/users/:Username' `Remove/delete a user from the database`
  - '/users/:Username/movies/:MovieID' `Remove a moive from user's favorite movies`.

#### Example JSON POST user return type

<blockquote>
 <pre>
 [
     { "Name": "Senorita", "FavoriteMovies": [], "Birthday":
          "1995-06-23T00:00:00.000Z", "_id": "6660404e309ec80a85024cd8", "__v":
          0 }
         {
          "_id": "665ed1536c94756777c8289a", "Name": "Joe", "FavoriteMovies": [
          "665e21bf0f85f47b51ae4d6b" ], "Birthday": "1978-06-19T00:00:00.000Z" }
     
 ]
</pre>
</blockquote>

### Authentication and Authorization

Once the API has been designed,the next step is to incoroperate authentication and authorization methods into applications. For my-flix-application we have implemented basic HTTP authentication for your initial login requests and JWT authentication for future requests to your API using a middleware tool called Passport. Thi way we can ensure that data endpoints are secure.

### Data Security, Validationa and Ethics

Lastly we have added following things to implemet

- Implement CORS into app, ensuring that all domains are allowed to make requests to your API.
- Add password hashing to your user schema and integrate it into the login and registration HTTP handlers to ensure that passwords aren’t stored in your database without first being hashed.
- Add data validation to any endpoint that’s expecting data in the request body.
- Deployed application to Heroku.
- Uploaded database to MongoDB Atlas.
- Connected with Heroku application to your MongoDB Atlas database.
