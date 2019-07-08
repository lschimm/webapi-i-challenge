// implement your API here
const express = require("express");

const Hubs = require("./data/db.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello?");
});

// R    READ
// error from DB:
// - cancel request, respond with code 500, return
server.get("/api/users", (req, res) => {
  Hubs.find()
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

// C    POST
server.post("/api/users", (req, res) => {
  const hubInfo = req.body;
  const { name, bio } = req.body;

  Hubs.insert(hubInfo)
    .then(hub => {
      if (!name || !bio) {
        res
          .status(400)
          .json({ message: "Please provide name and bio for the user." });
      } else {
        res.status(201).json(hub);
      }
    })
    .catch(error => {
      res.status(500).json(err);
    });
});

// D    DELETE

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  Hubs.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "can't find" });
      }
    })
    .catch(error => {
      res.status(500).json(err);
    });
});

// U    UPDATE
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;

  Hubs.update(id)
    .then(updated => {
      if (user.length === 0) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json();
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The user information could not be modified." });
    });
});

const port = 5001;
server.listen(port, () => console.log(`running on port ${port}`));
