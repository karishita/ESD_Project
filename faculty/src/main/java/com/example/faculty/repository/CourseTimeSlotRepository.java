package com.example.faculty.repository;
import com.example.faculty.entity.CourseTimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/*
 * Repository for CourseTimeSlot entity.
 */
@Repository
public interface CourseTimeSlotRepository extends JpaRepository<CourseTimeSlot, Long> {
    //Fetch all time slots for a given course
    List<CourseTimeSlot> findByCourseId(Long courseId);

}
