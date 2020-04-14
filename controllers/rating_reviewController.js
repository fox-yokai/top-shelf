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
router.get("/api/rating_reviews/:id", function (req, res) {
    // Add sequelize code to find a single post where the id is equal to req.params.id,
    // return the result to the user with res.json
    db.Post.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (dbRating_review) {
        res.json(dbRating_review);
    });
});

// Get route for returning user rating_review for a specific wine
router.get("/api/rating_reviews/wine_id/:wine_id", function (req, res) {
    // Add sequelize code to find all posts where the category is equal to req.params.category,
    // return the result to the user with res.json
    db.Post.findAll({
        where: {
            wine_id: req.params.wine_id
        }
    }).then(function (dbRating_review) {
        res.json(dbRating_review);
    });
});



// POST route for saving a new rating_review
router.post("/api/rating_reviews", function (req, res) {
    // Add sequelize code for creating a rating_review using req.body,
    // then return the result using res.json
    db.Rating_review.create({
        rating: req.body.rating,
        review: req.body.body,
    }).then(function (dbRating_review) {
        res.json(dbRating_review);
    });
});

// DELETE route for deleting rating_reviews
router.delete("/api/rating_reviews/:id", function (req, res) {
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

// PUT route for updating rating_reviews
router.put("/api/rating_reviews", function (req, res) {
    // Add code here to update a post using the values in req.body, where the id is equal to
    // req.body.id and return the result to the user using res.json
    db.Rating_review.update(req.body,
        {
            where: {
                id: req.body.id
            }
        })
        .then(function (dbRating_review) {
            res.json(dbRating_review);
        });
});

module.exports = router;