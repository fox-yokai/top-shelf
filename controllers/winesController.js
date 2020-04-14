const express = require('express');
const router = express.Router();
const db = require('../models');

router.get("/api/wines", (req, res) => {
    db.Wine.findAll()
    .then(results => res.json(results))
    .catch(error => {
      console.log(error)
      res.status(500).json(error)
    })
});

router.get("/api/wine/:id", (req, res) => {
    db.Wine.findAll({
        where: {
            id: req.params.id
        },
        include: [db.Note]
    })
    .then((response) => res.status(200).json(response))
    .catch(error => res.status(500).json(error))
});

router.post("/api/wine", (req, res) => {
    db.Wine.create(req.body)
    .then((response) => res.status(200).json(response))
    .catch(error => res.status(500).json(error))
});

router.delete("/api/wine/:id", (req,res) => {
    db.Wine.destroy({
        where: {
            id: req.params.id
        }
    })
    .then((response) => res.status(200).json(response))
    .catch(error => res.status(500).json(error))
})


module.exports = router;