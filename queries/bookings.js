const db = require("../db/dbConfig");


const getAllBookings = async () => {
    const allBookings = await db.any("SELECT * FROM bookings");
    return allBookings;
};

const getBooking = async (id) => {
    const oneBooking = await db.one("SELECT * FROM bookings WHERE id = $1", id);
    return oneBooking;
};

// INSERT INTO bookings (
//     meeting_name, meeting_room_id, start_date, end_date, attendees
// ) VALUES 
// ('Scrum Standup', 2, '2022-03-23T17:00:00.000Z', '2022-03-23T17:30:00.000Z', 'jdoe@email.com, bdylan@email.com')
// ;
const createBooking = async (booking) => {
    const newBooking = await db.one(
        "INSERT INTO bookings (meeting_name, meeting_room_id, start_date, end_date, attendees) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [booking.meeting_name, booking.meeting_room_id, booking.start_date, booking.end_date, booking.attendees]
    );
    return newBooking;
};

const deleteBooking = async (id) => {
    const deletedBooking = await db.one("DELETE FROM bookings WHERE id=$1 RETURNING *", id);
    return deletedBooking;
}

const updateBooking = async (id, booking) => {
    const updatedBooking = await db.one(
        "UPDATE bookings SET name=$1, capacity=$2, floor=$3 \
        WHERE id=$4 RETURNING *",
        [booking.name, booking.capacity, booking.floor, id]
    );
    return updatedBooking;
}


module.exports = { getAllBookings, getBooking, createBooking, updateBooking, deleteBooking };