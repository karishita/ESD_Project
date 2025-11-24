package com.example.faculty.service;
import com.example.faculty.dto.FacultyDTO;
import com.example.faculty.entity.Faculty;
import org.springframework.web.multipart.MultipartFile;
import com.example.faculty.dto.FacultyResponseDTO;
public interface FacultyService {
    FacultyResponseDTO registerFaculty(FacultyDTO facultyDTO,String email,MultipartFile photo);
}
