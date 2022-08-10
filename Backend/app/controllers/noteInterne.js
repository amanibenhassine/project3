const db = require("../models");
const noteInterne = db.noteInterne;

// Create and Save a new noteInterne
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a noteInterne
  const noteInterne = new noteInterne({
    id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });

  // Save noteInterne in the database
  noteInterne
    .save(noteInterne)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the noteInterne."
      });
    });
};

// Retrieve all noteInternes from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  noteInterne.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving noteInternes."
      });
    });
};

// Find a single noteInterne with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  noteInterne.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found noteInterne with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving noteInterne with id=" + id });
    });
};

// Update a noteInterne by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  noteInterne.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update noteInterne with id=${id}. Maybe noteInterne was not found!`
        });
      } else res.send({ message: "noteInterne was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating noteInterne with id=" + id
      });
    });
};

// Delete a noteInterne with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  noteInterne.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete noteInterne with id=${id}. Maybe noteInterne was not found!`
        });
      } else {
        res.send({
          message: "noteInterne was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete noteInterne with id=" + id
      });
    });
};

// Delete all noteInternes from the database.
exports.deleteAll = (req, res) => {
  noteInterne.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} noteInternes were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all noteInternes."
      });
    });
};

// Find all published noteInternes
exports.findAllPublished = (req, res) => {
  noteInterne.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving noteInternes."
      });
    });
};