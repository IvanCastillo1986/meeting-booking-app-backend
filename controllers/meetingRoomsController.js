const express = require("express");
const meetingRooms = express.Router();
const { getAllMeetingRooms, getMeetingRoom, createMeetingRoom, updateMeetingRoom, deleteMeetingRoom } = require("../queries/meetingRooms")


// INDEX
meetingRooms.get("/", async (req, res) => {

    try {
        const allMeetingRooms = await getAllMeetingRooms();
        res.status(200).json(allMeetingRooms);
    } catch(err) {
        res.status(500).json({ error: err.message});
    }

});

// ToDo /meeting-rooms/:id/bookings
// Retrieve all future bookings of a meeting room

// SHOW
meetingRooms.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const meetingRoom = await getMeetingRoom(id);
        res.status(200).json({ meetingRoom });
    } catch(err) {
        res.status(500).json({ errorGettingMeetingRoom: err.message });
    }
});

// CREATE
meetingRooms.post("/", async (req, res) => {
    const meetingRoom = req.body;

    try {
        const newMeetingRoom = await createMeetingRoom(meetingRoom);

        res.status(200).json({ newMeetingRoom: newMeetingRoom });
    } catch(err) {
        res.status(400).json({ errorCreatingMeetingRoom: err.message });
    }
});



// ** NOT USED **

// UPDATE
meetingRooms.put("/:id", async (req, res) => {
    const { id } = req.params;
    const meetingRoom = req.body;

    try {
        const updatedMeetingRoom = await updateMeetingRoom(id, meetingRoom);
        res.status(200).json(updatedMeetingRoom);
    } catch(err) {
        res.status(404).json({ errorUpdatingMeetingRoom: err.message });
    }
});

// DELETE
meetingRooms.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedMeetingRoom = await deleteMeetingRoom(id);
        res.status(200).json({ deletedMeetingRoom });
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
});



module.exports = meetingRooms;