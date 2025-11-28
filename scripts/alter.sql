-- ===========================
-- ADD FOREIGN KEYS
-- ===========================

-- course.department_id → department.id
ALTER TABLE course
    ADD CONSTRAINT fk_course_department
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE CASCADE;

-- course_timeslot.course_id → course.id
ALTER TABLE course_timeslot
    ADD CONSTRAINT fk_timeslot_course
    FOREIGN KEY (course_id)
    REFERENCES course(id)
    ON DELETE CASCADE;

-- faculty.department_id → department.id
ALTER TABLE faculty
    ADD CONSTRAINT fk_faculty_department
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE CASCADE;

-- faculty_course.faculty_id → faculty.id
ALTER TABLE faculty_course
    ADD CONSTRAINT fk_facultycourse_faculty
    FOREIGN KEY (faculty_id)
    REFERENCES faculty(id)
    ON DELETE CASCADE;

-- faculty_course.course_id → course.id
ALTER TABLE faculty_course
    ADD CONSTRAINT fk_facultycourse_course
    FOREIGN KEY (course_id)
    REFERENCES course(id)
    ON DELETE CASCADE;

