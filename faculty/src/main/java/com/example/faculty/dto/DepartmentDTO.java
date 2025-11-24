package com.example.faculty.dto;
import lombok.Data;
@Data
public class DepartmentDTO {
    /*
     * DTO for sending department details to the frontend.
     * Used for dropdowns and clean API responses.
     */
    private Long id;
    private String name;
}
