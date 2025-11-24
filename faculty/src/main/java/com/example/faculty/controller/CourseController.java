package com.example.faculty.controller;
import com.example.faculty.dto.CourseDTO;
import com.example.faculty.dto.CourseTimeSlotsDTO;
import com.example.faculty.entity.Course;
import com.example.faculty.entity.CourseTimeSlot;
import com.example.faculty.repository.CourseRepository;
import com.example.faculty.repository.CourseTimeSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
@RestController
@RequestMapping("/courses")
public class CourseController {
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private CourseTimeSlotRepository courseTimeSlotRepository;
    @GetMapping
    public List<CourseDTO> getAllCourses()
    {
        // Fetch courses
        List<Course> courses = courseRepository.findAll();
        // Convert Course → CourseDTO
        return courses.stream().map(course -> {

            CourseDTO dto = new CourseDTO();
            dto.setId(course.getId());
            dto.setCourseName(course.getCourseName());

            // Fetch Timeslots for the course
            List<CourseTimeSlot> slots =
                    courseTimeSlotRepository.findByCourseId(course.getId());

            //  convert CourseTimeSlot → CourseTimeSlotDTO
            List<CourseTimeSlotsDTO> slotDTOs = slots.stream().map(slot -> {
                CourseTimeSlotsDTO s = new CourseTimeSlotsDTO();
                s.setId(slot.getId());
                s.setDayOfWeek(slot.getDayOfWeek());
                s.setStartTime(slot.getStartTime());
                s.setEndTime(slot.getEndTime());
                return s;
            }).collect(Collectors.toList());

            dto.setTimeSlots(slotDTOs);

            return dto;

        }).collect(Collectors.toList());
    }
}
