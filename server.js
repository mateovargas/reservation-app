// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// RESERVATIONS (DATA)
// =============================================================
var reservations = [];
var waitList = [];
// Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});
app.get("/add", function (req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
});
// Get all characters
app.get("/reservations", function (req, res) {
    res.sendFile(path.join(__dirname, "reservations.html"));
});
// Search for Specific Reservation (or all Reservations) - provides JSON
app.get("/api/reservations", function (req, res) {
    res.json(reservations);
});

app.get("/api/waitList", function(req, res){
    res.json(waitList);
});
// Create Reservations
app.post("/api/reservations", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    console.log(req.body);
    var newReservation = req.body;
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    //newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();
    //console.log(newcharacter);
    //characters.push(newcharacter);
    ///res.json(newcharacter);
    if(reservations.length === 5){
        waitList.push(newReservation);
    }
    else{
        reservations.push(newReservation);
    }
    res.json(newReservation);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});