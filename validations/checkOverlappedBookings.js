const db = require("../db/dbConfig")

// Conversion with JS
const checkOverlappedBookings = async (meeting_room_id, start_date, end_date) => {
    // change the data type from 'text' to 'timestamp' for the query with TO_TIMESTAMP.
    // also check if it overlaps with the other times in bookings table.
    // TO_TIMESTAMP takes two arguments: The iso date, and time format
    

    const overlappedBookings = await db.any(
        `SELECT * FROM bookings 
        WHERE meeting_room_id = $1 
        AND (TO_TIMESTAMP(start_date, 'YYYY-MM-DD"T"HH24:MI:SS.USZ'), TO_TIMESTAMP(end_date, 'YYYY-MM-DD"T"HH24:MI:SS.USZ')) 
        OVERLAPS (TO_TIMESTAMP($2, 'YYYY-MM-DD"T"HH24:MI:SS.USZ'), TO_TIMESTAMP($3, 'YYYY-MM-DD"T"HH24:MI:SS.USZ'))`,
        [meeting_room_id, start_date, end_date]
    );

    return overlappedBookings
};


module.exports = { checkOverlappedBookings };