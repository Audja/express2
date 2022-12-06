require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const movieHandlers = require("./movieHandlers");
const usersHandlers = require("./userHandlers");

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

app.get("/", welcome);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUserById);
app.post("/api/users", usersHandlers.postUser);
app.post("/api/movies", movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.put("/api/users/:id", usersHandlers.updateUser);
app.delete("/api/user/:id", userHandlers.deleteUser);
