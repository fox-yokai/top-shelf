// *********************************************************************************
// htmlController.js - this file defines a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const express = require('express');
const router = express.Router();
const path = require("path");

// Routes

// index (root) route loads index.html
router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// login route loads login.html
router.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
});

// signup route loads signup.html
router.get("/signup", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
});

// member route loads members.html
// router.get("/members", function (req, res) {
//     res.sendFile(path.join(__dirname, "../public/members.html"));
// });

module.exports = router;
