package com.example.faculty.dto;
import lombok.Data;
import java.util.List;
/*
 * FacultyDTO represents the input JSON sent from the frontend.
 * It is SEPARATE from the Faculty entity.
 * We NEVER send entities directly across API.
 */
@Data
public class FacultyDTO {
    private String fullName;
    private String email;
    private String phone;
    private String photoPath;
    private Long departmentId;
    private List<Long> courseIds;
}
