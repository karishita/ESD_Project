package com.example.faculty.dto;
import lombok.Data;
import java.util.*;
@Data
public class CourseDTO {
    /*
     * DTO for sending course details and their timeslots to the frontend.
     * Used for dropdowns and for checking time-slot conflicts.
     */
    private Long id;
    private String courseName;
    private List<CourseTimeSlotsDTO> timeSlots;

}
