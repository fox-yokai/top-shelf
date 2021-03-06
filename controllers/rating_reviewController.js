// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

const express = require('express');
const router = express.Router();
// Requiring our Rating_review model
const db = require("../models");


//  5 routes - findAll, findOne, create, update, destroy

// Routes
// =============================================================
// GET route for getting all of the review_
router.get("/api/rating_reviews", function (req, res) {
    // Add sequelize code to find all ratings and reviews, and return them to the user with res.json
    db.Rating_review.findAll({
        include: [db.Wine]
    })
        .then(function (dbRating_review) {
            res.json(dbRating_review);
        });
});

// Get route for retrieving a single rating_review
router.get("/api/rating_review/:id", function (req, res) {
    // Add sequelize code to find a single post where the id is equal to req.params.id,
    // return the result to the user with res.json
    db.Rating_review.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (dbRating_review) {
        res.json(dbRating_review);
    });
});

// Get route for returning user rating_review for a specific wine
router.get("/api/rating_review/WineID/:WineId", function (req, res) {
    // Add sequelize code to find all posts where the category is equal to req.params.category,
    // return the result to the user with res.json
    db.Rating_review.findAll({
        where: {
            WineId: req.params.WineId
        }
    }).then(function (dbRating_review) {
        res.json(dbRating_review);
    }).catch(function (err) {
        $(".errorMessage").show();
    })

});



// POST route for saving a new rating_review
router.post("/api/rating_review", function (req, res) {
    // Add sequelize code for creating a rating_review using req.body,
    // then return the result using res.json
    db.Rating_review.create(req.body)
        .then((response) => res.status(200).json(response))
        .catch(error => res.status(500).json(error))
});

// DELETE route for deleting a rating_reviews
router.delete("/api/rating_review/:id", function (req, res) {
    // Add sequelize code to delete a post where the id is equal to req.params.id, 
    // then return the result to the user using res.json
    db.Rating_review.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(function (dbRating_review) {
            res.json(dbRating_review);
        });
});

// PUT route for updating a rating_reviews
router.put("/api/rating_review/:id", function (req, res) {
    // Add code here to update a post using the values in req.body, where the id is equal to
    // req.body.id and return the result to the user using res.json
    db.Rating_review.update(
        { rating: req.body.rating, review: req.body.review },
        { returning: true, where: { id: req.params.id } }
    )
        .then((results) => {
            if (results.affectedRows === 0) {
                return res.json({ statusCode: 404 })
            }
            res.json(results)
        })
        .catch(error => res.status(500).json(error))
});

module.exports = router;