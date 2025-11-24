package com.example.faculty.controller;
import com.example.faculty.dto.FacultyDTO;

import com.example.faculty.security.jwt.JwtUtils;import com.example.faculty.entity.Faculty;
import com.example.faculty.dto.FacultyResponseDTO;
import com.example.faculty.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/faculty")
public class FacultyController {
    @Autowired
    private FacultyService facultyService;
    @Autowired
    private JwtUtils jwtUtils;
    @PostMapping("/register")
    public ResponseEntity<?> registerFaculty(@RequestBody FacultyDTO dto,@RequestHeader("Authorization") String authHeader) {
        //Extract Token
        //String token=authHeader.replace("Bearer " ,"");
        String token = authHeader.substring(7);
        String email = jwtUtils.getUsernameFromToken(token);
        dto.setEmail(email);
        FacultyResponseDTO response = facultyService.registerFaculty(dto,email);

        return ResponseEntity.ok(response);


    }
}
