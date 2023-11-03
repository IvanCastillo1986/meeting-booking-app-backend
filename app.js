// DEPENDENCIES
const express = require('express');
const cors = require("cors");
const meetingRoomsController = require('./controllers/meetingRoomsController')
const bookingsController = require('./controllers/bookingsController')


// CONFIGURATION
const app = express();

app.use(express.json());
app.use(cors());
app.use('/meeting-rooms', meetingRoomsController);
app.use('/bookings', bookingsController);

// ROUTES
app.get("/", (req, res) => {
    res.send("Welcome to the clients booking API");
});

// ERROR ROUTE
app.get("*", (req, res) => {
    res.status(404).json({error: "Page not found"});
});


// EXPORT
module.exports = app;