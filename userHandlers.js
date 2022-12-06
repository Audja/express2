const database = require("./database");

const users = [
  ("John", "Doe", "john.doe@example.com", "Paris", "English"),
  ("Valeriy", "Appius", "valeriy.appius@example.com", "Moscow", "Russian"),
  ("Ralf", "Geronimo", "ralf.geronimo@example.com", "New York", "Italian"),
];

const getUsers = (req, res) => {
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

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUserByLanguage = (req, res) => {
  let sql = "select * from users";
  const sqlValues = [];

  if (req.query.language != null) {
    sql += " where language = English";
    sqlValues.push(req.query.language);
  } else {
    res.status(200).send("Ok");
  }

  database
    .query(sql, sqlValues)
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUserByCity = (req, res) => {
  let sql = "select * from users";
  const sqlValues = [];

  if (req.query.city != null) {
    sql += " where city = Paris";
    sqlValues.push(req.query.city);
  } else {
    res.status(200).send("Ok");
  }

  database
    .query(sql, sqlValues)
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const postUser = (req, res) => {
  const { firstname, lastname, email, city } = req.body;

  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city) VALUES (?, ?, ?, ?)",
      [firstname, lastname, email, city]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city } = req.body;

  database
    .query(
      "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ? where id = ?",
      [firstname, lastname, email, city, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the user");
    });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("delete from user where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting the ");
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUser,
  deleteUser,
  getUserByLanguage,
  getUserByCity,
};
