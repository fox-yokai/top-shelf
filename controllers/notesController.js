const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/api/notes', (req, res) => {
  db.Note.findAll({
    include: [db.Wine]
  })
    .then(results => res.json(results))
    .catch(error => res.status(500).json(error))
});

// Get route for retrieving a single note
router.get("/api/notes/:id", function (req, res) {
  // Add sequelize code to find a single post where the id is equal to req.params.id,
  // return the result to the user with res.json
  db.Note.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(results => res.json(results))
    .catch(error => res.status(500).json(error))
});

// POST route for saving a new note
router.post("/api/notes", function (req, res) {
  // Add sequelize code for creating a rating_review using req.body,
  // then return the result using res.json
  db.Note.create({
    rating: req.body.rating,
    review: req.body.body,
  })
    .then(results => res.json(results))
    .catch(error => res.status(500).json(error))
});

router.delete('/api/notes/:id', (req, res) => {
  db.Note.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((results) => res.status(200).json(results))
    .catch(error => res.status(500).json(error))
});

// PUT route for updating a note
router.put("/api/notes", function (req, res) {
  // Add code here to update a post using the values in req.body, where the id is equal to
  // req.body.id and return the result to the user using res.json
  db.Note.update(req.body,
    {
      where: {
        id: req.body.id
      }
    })
    .then(results => res.json(results))
    .catch(error => res.status(500).json(error))
});

module.exports = router;