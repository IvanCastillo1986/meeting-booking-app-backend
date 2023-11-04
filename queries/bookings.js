const db = require("../db/dbConfig");


const getAllBookings = async () => {
    const currentDate = new Date();
    const isoDateString = currentDate.toISOString();

    const allBookings = await db.any("SELECT * FROM bookings WHERE start_date > $1", isoDateString);
    return allBookings;
};

const getAllBookingsAndMeetingRoom = async () => {
    
    const currentDate = new Date();
    const isoDateString = currentDate.toISOString();

    const allBookingsAndItsMeetings = await db.any(
        "SELECT bookings.*, meeting_rooms.floor, meeting_rooms.capacity, meeting_rooms.name \
        FROM bookings FULL JOIN meeting_rooms ON meeting_rooms.id = bookings.meeting_room_id \
        WHERE bookings.start_date > $1", 
    isoDateString);
    return allBookingsAndItsMeetings;
}; 

const getBookingsByMeetingRoomId = async (meetingRoomId) => {
    const bookingsByMeetingRoomId = await db.any(
        "SELECT bookings.* \
        FROM bookings LEFT JOIN meeting_rooms ON bookings.meeting_room_id = meeting_rooms.id \
        WHERE bookings.meeting_room_id=$1",
    meetingRoomId);
    return bookingsByMeetingRoomId;
};

const getBookingsForMeetingRoom = async (meetingRoomId) => {
    const currentDate = new Date();
    const isoDateString = currentDate.toISOString();

    const bookingsByMeetingRoomId = await db.any(
        "SELECT bookings.* \
        FROM bookings LEFT JOIN meeting_rooms ON bookings.meeting_room_id = meeting_rooms.id \
        WHERE bookings.meeting_room_id=$1 AND bookings.start_date > $2",
    [meetingRoomId, isoDateString]);
    return bookingsByMeetingRoomId;
};

const getBooking = async (id) => {
    const oneBooking = await db.one("SELECT * FROM bookings WHERE id = $1", id);
    return oneBooking;
};

const createBooking = async (booking) => {
    const newBooking = await db.one(
        "INSERT INTO bookings (meeting_name, meeting_room_id, start_date, end_date, attendees) \
        VALUES ($1, $2, $3, $4, $5) RETURNING *",
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

// ToDo
// VALIDATION FOR DATE/TIME
const overlappingBookingsQuery = async (meeting_room_id, start_date, end_date) => {
    // change the data type from text to timestamp for the query with TO_TIMESTAMP
    // TO_TIMESTAMP takes two arguments: 
    

    // GET THIS TO WORK
    const overlappedBookings = await db.any(
        // `SELECT * FROM bookings WHERE meeting_room_id = $1 AND (TO_TIMESTAMP(start_date, 'YYYY-MM-DDTHH24:MI:SS.USZ')), (TO_TIMESTAMP(end_date, 'YYYY-MM-DDTHH24:MI:SS.USZ')) OVERLAPS (TO_TIMESTAMP($2, 'YYYY-MM-DDTHH24:MI:SS.USZ')), (TO_TIMESTAMP($3, 'YYYY-MM-DDTHH24:MI:SS.USZ'))`,
        `SELECT * FROM bookings 
        WHERE meeting_room_id = $1 
        AND (TO_TIMESTAMP(start_date, 'YYYY-MM-DDTHH24:MI:SS.USZ'), TO_TIMESTAMP(end_date, 'YYYY-MM-DDTHH24:MI:SS.USZ')) 
        OVERLAPS (TO_TIMESTAMP($2, 'YYYY-MM-DDTHH24:MI:SS.USZ'), TO_TIMESTAMP($3, 'YYYY-MM-DDTHH24:MI:SS.USZ'))`,
        [meeting_room_id, start_date, end_date]
    );
    // console.log('inside queries')
    // console.log(overlappedBookings)

    return overlappedBookings
};


module.exports = { getAllBookings, getBooking, getAllBookingsAndMeetingRoom, getBookingsForMeetingRoom, 
    getBookingsByMeetingRoomId, createBooking, updateBooking, deleteBooking, overlappingBookingsQuery };