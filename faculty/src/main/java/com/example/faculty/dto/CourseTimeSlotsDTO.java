package com.example.faculty.dto;
import lombok.Data;
@Data
public class CourseTimeSlotsDTO {
    /*
     * DTO for sending a single time slot to the frontend.
     * Used inside CourseDTO.
     */
    private Long id;
    private String dayOfWeek;
    private String startTime;
    private String endTime;
}
