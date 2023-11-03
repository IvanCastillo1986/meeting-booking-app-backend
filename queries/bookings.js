const db = require("../db/dbConfig");


const getAllBookings = async () => {
    const allBookings = await db.any("SELECT * FROM bookings");
    return allBookings;
};



const getAllBookingsAndItsMeetingRoom = async (meetingRoomId) => {
    const bookingsByMeetingRoomId = await db.any(
        "SELECT bookings.* \
        FROM bookings LEFT JOIN meeting_rooms ON bookings.meeting_room_id = meeting_rooms.id \
        WHERE bookings.meeting_room_id=$1",
    meetingRoomId);
    return bookingsByMeetingRoomId;
};
const getBookingsByMeetingRoomId = async (meetingRoomId) => {
    const bookingsByMeetingRoomId = await db.any(
        "SELECT bookings.* \
        FROM bookings LEFT JOIN meeting_rooms ON bookings.meeting_room_id = meeting_rooms.id \
        WHERE bookings.meeting_room_id=$1",
    meetingRoomId);
    return bookingsByMeetingRoomId;
};

const getBooking = async (id) => {
    const oneBooking = await db.one("SELECT * FROM bookings WHERE id = $1", id);
    return oneBooking;
};

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


module.exports = { getAllBookings, getBooking, getBookingsByMeetingRoomId, createBooking, updateBooking, deleteBooking };