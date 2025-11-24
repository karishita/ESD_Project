package com.example.faculty.service;
import com.example.faculty.dto.FacultyDTO;
import com.example.faculty.entity.Faculty;
import com.example.faculty.dto.FacultyResponseDTO;
public interface FacultyService {
    FacultyResponseDTO registerFaculty(FacultyDTO facultyDTO,String email);
}
