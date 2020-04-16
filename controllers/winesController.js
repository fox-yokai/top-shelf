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

// get a single wine by it's id
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

// Get route for returning all wines for a specific user
router.get("/api/wines/UserID/:id", function (req, res) {
    // Add sequelize code to find all posts where the category is equal to req.params.category,
    // return the result to the user with res.json
    // console.log('in winesController UserID: ' + req.params.id)
    db.Wine.findAll({
        where: {
            UserId: req.params.id
        }
    }).then(function (wineList) {
        // console.log('in winesController UserID: ' + req.body.UserId)
        res.json(wineList);
    });
});


// get all wines for a single user
// router.get("/api/wines/UserId/:id", (req, res) => {
//     db.Wine.findAll({
//         where: {
//             id: req.params.id
//         },
//         include: [db.Note]
//     })
//         .then((response) => res.status(200).json(response))
//         .catch(error => res.status(500).json(error))
// });

router.post("/api/wine", (req, res) => {
    db.Wine.create(req.body)
        .then((response) => res.status(200).json(response))
        .catch(error => res.status(500).json(error))
});

router.delete("/api/wine/:id", (req, res) => {
    db.Wine.destroy({
        where: {
            id: req.params.id
        }
    })
        .then((response) => res.status(200).json(response))
        .catch(error => res.status(500).json(error))
})


module.exports = router;