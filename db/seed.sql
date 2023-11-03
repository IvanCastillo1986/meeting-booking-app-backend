\c meetings_dev;

-- CREATE TABLE meeting_rooms (
--     id SERIAL PRIMARY KEY,
--     name TEXT,
--     capacity INT,
--     floor INT
-- );

INSERT INTO meeting_rooms (
    name, capacity, floor
) VALUES 
('Meeting Room 1', 3, 22)
;


-- CREATE TABLE bookings (
--     id SERIAL PRIMARY KEY,
--     meeting_name TEXT,
--     meeting_room_id INT,
--     start_date TEXT,
--     end_date TEXT,
--     attendees TEXT
-- );

INSERT INTO bookings (
    meeting_name, meeting_room_id, start_date, end_date, attendees
) VALUES 
('Scrum Standup', 2, '2022-03-23T17:00:00.000Z', '2022-03-23T17:30:00.000Z', 'jdoe@email.com, bdylan@email.com')
;
