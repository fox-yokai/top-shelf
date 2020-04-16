var express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
var db = require("./models");

var PORT = process.env.PORT || 8080;

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(require("./controllers/rating_reviewController"))
app.use(require("./controllers/winesController"))
app.use(require("./controllers/usersController"))
app.use(require("./controllers/notesController"))
app.use(require("./controllers/htmlController"))

db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("Listening on port %s", PORT);
    });
});