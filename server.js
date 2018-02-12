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
var reservations = []; //stores our current tables
var waitList = []; //stores the waiting list
var historicalList = []; //stores our history of tables.
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
//searches for the waitlist, provides JSON.
app.get("/api/waitList", function(req, res){
    res.json(waitList);
});
//searches for the historical data, provides JSON.
app.get("/api/clear", function(req, res){
    res.json(historicalList);
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

//Post method to clear the 5 current tables.
//Pushes the people on the waiting list to reservations
//and then deletes them off waitList.
//Stores our previous reservations into the historicalList.
app.post("/api/clear", function(req, res){

    historicalList = [...reservations];

    reservations = [];

    for(var i = 0; i < 5; i++){
        
        if(waitList[0] !== undefined){
            reservations.push(waitList[0]);
            waitList.splice(0, 1);
        }

    }

    res.json(historicalList);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});