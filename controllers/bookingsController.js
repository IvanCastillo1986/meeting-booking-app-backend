const express = require("express");
const bookings = express.Router();
const { getAllBookings, getBooking, getAllBookingsAndMeetingRoom, createBooking, 
    updateBooking, deleteBooking } = require("../queries/bookings");
const { checkOverlappedBookings } = require("../validations/checkOverlappedBookings");


// INDEX
bookings.get("/", async (req, res) => {
    const { plusMeetingRoomData } = req.query;

    try {
        if (plusMeetingRoomData) {
            const allBookings = await getAllBookingsAndMeetingRoom();
            res.status(200).json(allBookings);
        } else {
            const allBookings = await getAllBookings();
            res.status(200).json(allBookings);
        }
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

// SHOW
bookings.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const booking = await getBooking(id);
        res.status(200).json(booking);
    } catch(err) {
        res.status(500).json({ errorGettingBooking: err.message });
    }
});

// CREATE
bookings.post("/", async (req, res) => {
    // ToDo: implement overlappedBookings validation here
    console.log('calling bookings Create query. req.body:', req.body)
    const booking = req.body;
    const {meeting_room_id, start_date, end_date} = booking;
    
    booking.meeting_room_id = Number(booking.meeting_room_id);
    try {
        const overlappedBookings = await checkOverlappedBookings(meeting_room_id, start_date, end_date);

        if (overlappedBookings.length > 0) {
            console.log('Bookings are overlapping:', overlappedBookings)
            
            res.status(200).json(overlappedBookings)
            
            // ToDo:  THEN in front-end, check if response is array. 
            //        If it's an array, show user message that it's conflicting in times with other bookings
            //        Eventually, change front-end to show the bookings that are currrently conflicting

        } else {
            const newBooking = await createBooking(booking);
            
            res.status(200).json(newBooking);
        }
    } catch(err) {
        res.status(400).json({ errorCreatingBooking: err.message });
    }
});

// DELETE
bookings.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBooking = await deleteBooking(id);
        res.status(200).json(deletedBooking);
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
});



// NOT USED

// UPDATE
bookings.put("/:id", async (req, res) => {
    const { id } = req.params;
    const booking = req.body;

    try {
        const updatedBooking = await updateBooking(id, booking);
        res.status(200).json(updatedBooking);
    } catch(err) {
        res.status(404).json({ errorUpdatingBooking: err.message });
    }
});



module.exports = bookings;