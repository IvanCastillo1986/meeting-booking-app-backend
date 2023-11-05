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
('Comedy Standup', 2, '2022-03-23T17:00:00.000Z', '2022-03-23T17:30:00.000Z', 'jdoe@email.com, bdylan@email.com'),
('Fellows end-of-module Party', 3, '2023-12-23T17:00:00.000Z', '2023-12-23T17:30:00.000Z', 'Art@email.com, littleD@email.com, LisaSimpson@pursuit.org'),
('CEO Meeting', 1, '2022-03-23T17:00:00.000Z', '2022-03-23T17:30:00.000Z', 'Jorel@pursuit.org, Kalel@email.com'),
('CEO Going Away', 1, '2026-03-23T17:00:00.000Z', '2026-03-23T17:30:00.000Z', 'Rick@pursuit.org, Morty@email.com'),
('Scrum Standup', 2, '2024-05-23T17:00:00.000Z', '2024-05-23T17:30:00.000Z', 'jdoe@email.com, bdylan@email.com'),
('Rap Battle', 2, '2024-07-23T17:00:00.000Z', '2024-07-23T17:30:00.000Z', 'jdoe@email.com, bdylan@email.com'),
('Dev Meeting', 1, '2024-03-23T17:00:00.000Z', '2024-03-23T17:30:00.000Z', 'jen@gmail.com, bob@email.com'),
('Eminem Party', 3, '2024-03-23T17:00:00.000Z', '2024-03-23T17:30:00.000Z', 'jinster@gmail.com, jonster@email.com'),
('Roast Battle', 3, '2024-03-23T17:00:00.000Z', '2024-03-23T17:30:00.000Z', 'janster@gmail.com, jenster@email.com')
;
