package com.example.faculty.dto;
import lombok.Data;
import java.util.*;
@Data
public class FacultyResponseDTO {

        private Long id;
        private String employeeId;
        private String fullName;
        private String email;
        private String phone;
        private String photoPath;

        private String departmentName;
        private List<String> courseNames;
    }


