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
router.get("/api/note/:id", function (req, res) {
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

// Get route for returning all notes for a specific wine
router.get("/api/notes/WineId/:id", function (req, res) {
  // console.log('in notesController WineId: ' + req.params.id)
  db.Note.findAll({
    where: {
      WineId: req.params.id
    }
  }).then(function (noteList) {
    console.log('in notesController WineId: ' + req.params.id)
    res.json(noteList);
  });
});


// POST route for saving a new note
router.post("/api/note", function (req, res) {
  // Add sequelize code for creating a rating_review using req.body,
  // then return the result using res.json
  db.Note.create(req.body)
    .then(results => res.json(results))
    .catch(error => res.status(500).json(error))
});

// DELETE route for deleting a single note
router.delete('/api/note/:id', (req, res) => {
  db.Note.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((results) => res.status(200).json(results))
    .catch(error => res.status(500).json(error))
});

// PUT route for updating a note
router.put("/api/note/:id", function (req, res, next) {
  // Add code here to update a note using the values in req.body, where the id is equal to
  // req.body.id and return the result to the user using res.json
  db.Note.update(
    { note: req.body.note },
    { returning: true, where: { id: req.params.id } }
  )
    .then((results) => {
      if (results.affectedRows === 0) {
        return res.json({ statusCode: 404 })
      }
      res.json({ statusCode: 200 })
    })
    .catch(error => res.status(500).json(error))
});

module.exports = router;