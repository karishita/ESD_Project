-- ===========================
-- CREATE TABLES
-- ===========================

CREATE TABLE department (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE course (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(255) NOT NULL,
    credits INT,
    capacity INT,
    department_id BIGINT NOT NULL
);

CREATE TABLE course_timeslot (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    day_of_week VARCHAR(255) NOT NULL,
    start_time VARCHAR(255) NOT NULL,
    end_time VARCHAR(255) NOT NULL,
    course_id BIGINT NOT NULL
);

CREATE TABLE faculty (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(255) NOT NULL UNIQUE,
    photo_path VARCHAR(255),
    department_id BIGINT NOT NULL
);

CREATE TABLE faculty_course (
    faculty_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    PRIMARY KEY (faculty_id, course_id)
);

