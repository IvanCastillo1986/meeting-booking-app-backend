CREATE TABLE meeting_rooms (
    id SERIAL PRIMARY KEY,
    name TEXT,
    capacity INT,
    floor INT
);

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    meeting_name TEXT,
    meeting_room_id INT,
    start_date TEXT,
    end_date TEXT,
    attendees TEXT
);
