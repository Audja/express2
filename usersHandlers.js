const database = require("./database");

const users = [
  {
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    city: "Paris",
    language: "English",
  },
  {
    firstname: "Ralf",
    lastname: "Geronimo",
    email: "ralf.geronimo@example.com",
    city: "New York",
    language: "Italian",
  },
];

const getUser = (req, res) => {
  console.log(database);
  database
    .query("select * from users")
    .then(([users]) => {
      res.json(users);
    })

    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUserByFirstname = (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find((users) => users.firstname === id);

  if (user != null) {
    res.json(user);
  } else {
    res.status(404).send("Not Found");
  }
};

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;
  database
    .query(
      "INSERT INTO users( firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
};

module.exports = {
  postUser,
};
