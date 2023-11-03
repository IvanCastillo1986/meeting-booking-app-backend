const db = require("../db/dbConfig");


const getAllMeetingRooms = async () => {
    const allMeetingRooms = await db.any("SELECT * FROM meeting_rooms");
    return allMeetingRooms;
};

const getMeetingRoom = async (id) => {
    const oneMeetingRoom = await db.one("SELECT * FROM meeting_rooms WHERE id = $1", id);
    return oneMeetingRoom;
};

const createMeetingRoom = async (meetingRoom) => {
    const newMeetingRoom = await db.one(
        "INSERT INTO meeting_rooms (name, capacity, floor) VALUES ($1, $2, $3) RETURNING *",
        [meetingRoom.name, meetingRoom.capacity, meetingRoom.floor]
    );
    return newMeetingRoom;
};

const deleteMeetingRoom = async (id) => {
    const deletedMeetingRoom = await db.one("DELETE FROM meeting_rooms WHERE id=$1 RETURNING *", id);
    return deletedMeetingRoom;
}

const updateMeetingRoom = async (id, meetingRoom) => {
    const updatedMeetingRoom = await db.one(
        "UPDATE meeting_rooms SET name=$1, capacity=$2, floor=$3 \
        WHERE id=$4 RETURNING *",
        [meetingRoom.name, meetingRoom.capacity, meetingRoom.floor, id]
    );
    return updatedMeetingRoom;
}


module.exports = { getAllMeetingRooms, getMeetingRoom, createMeetingRoom, updateMeetingRoom, deleteMeetingRoom };