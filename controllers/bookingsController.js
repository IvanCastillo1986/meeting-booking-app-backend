const express = require("express");
const bookings = express.Router();
const { getAllBookings, getBooking, createBooking, updateBooking, deleteBooking } = require("../queries/bookings")


// INDEX
bookings.get("/", async (req, res) => {

    try {
        const allBookings = await getAllBookings();
        res.status(200).json(allBookings);
    } catch(err) {
        res.status(500).json({ error: err.message});
    }

});

// SHOW
bookings.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const booking = await getBooking(id);
        res.status(200).json({ booking });
    } catch(err) {
        res.status(500).json({ errorGettingBooking: err.message });
    }
});

// CREATE
bookings.post("/", async (req, res) => {
    const booking = req.body;

    try {
        const newBooking = await createBooking(booking);

        res.status(200).json({ newBooking: newBooking });
    } catch(err) {
        res.status(400).json({ errorCreatingBooking: err.message });
    }
});

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

// DELETE
bookings.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBooking = await deleteBooking(id);
        res.status(200).json({ deletedBooking });
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
});



module.exports = bookings;