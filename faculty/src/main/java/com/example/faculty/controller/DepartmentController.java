package com.example.faculty.controller;
import com.example.faculty.dto.DepartmentDTO;
import com.example.faculty.entity.Department;
import com.example.faculty.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
@RestController
@RequestMapping("/departments")
public class DepartmentController {
    @Autowired
    private DepartmentRepository departmentRepository;
    @GetMapping
    public List<DepartmentDTO> getAllDepartments()
    {
        //Fetch all departments from DB
        List<Department> departments=departmentRepository.findAll();
       //Convert Entity to DTO for json output
        return departments.stream().map(dept -> {
            DepartmentDTO dto = new DepartmentDTO();
            dto.setId(dept.getId());
            dto.setName(dept.getName());
            return dto;
        }).collect(Collectors.toList());
    }

}
