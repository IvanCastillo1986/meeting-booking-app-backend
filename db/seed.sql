\c meetings_dev;


INSERT INTO meeting_rooms (
    name, capacity, floor
) VALUES 
('Meeting Room 1', 3, 22),
('Meeting Room 2', 5, 31),
('Meeting Room 3', 7, 13)
;

INSERT INTO bookings (
    meeting_name, meeting_room_id, start_date, end_date, attendees
) VALUES 
('Scrum Standup', 2, '2022-03-23T17:00:00.000Z', '2022-03-23T17:30:00.000Z', 'jdoe@email.com, bdylan@email.com'),
('Fellows end-of-module Party', 3, '2022-03-23T17:00:00.000Z', '2022-03-23T17:30:00.000Z', 'Art@email.com, littleD@email.com, LisaSimpson@pursuit.org'),
('CEO Meeting', 1, '2022-03-23T17:00:00.000Z', '2022-03-23T17:30:00.000Z', 'Jorel@pursuit.org, Kalel@email.com'),
('Srcum Standup', 2, '2022-03-23T17:00:00.000Z', '2022-03-23T17:30:00.000Z', 'jdoe@email.com, bdylan@email.com'),
('Dev Meeting', 1, '2022-03-23T17:00:00.000Z', '2022-03-23T17:30:00.000Z', 'jen@gmail.com, bob@email.com')
;
