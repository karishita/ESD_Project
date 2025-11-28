-- ================================================
-- INSERT DATA INTO department
-- ================================================
INSERT INTO department (id, name) VALUES
    (1, 'CSE'),
    (2, 'ECE'),
    (3, 'Mechanical'),
    (4, 'AI & DS');

-- ================================================
-- INSERT DATA INTO course
-- ================================================
INSERT INTO course (id, capacity, course_name, credits, department_id) VALUES
    (1, 80, 'Data Structures', 4, 1),
    (2, 60, 'Operating Systems', 3, 1),
    (3, 70, 'DBMS', 4, 1),
    (4, 75, 'Computer Networks', 3, 1),
    (5, 90, 'Machine Learning', 4, 1);

-- ================================================
-- INSERT DATA INTO course_timeslot
-- ================================================
INSERT INTO course_timeslot (id, day_of_week, end_time, start_time, course_id) VALUES
    (1, 'Mon', '12:00', '10:00', 1),
    (2, 'Wed', '12:00', '10:00', 1),
    (3, 'Tue', '11:00', '09:00', 2),
    (4, 'Thu', '11:00', '09:00', 2),
    (5, 'Mon', '13:00', '11:00', 3),
    (6, 'Fri', '16:00', '14:00', 4),
    (7, 'Tue', '16:00', '14:00', 5),
    (8, 'Fri', '12:00', '10:00', 5);

