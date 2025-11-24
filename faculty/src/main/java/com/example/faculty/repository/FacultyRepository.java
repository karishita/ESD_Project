package com.example.faculty.repository;
import com.example.faculty.entity.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for Faculty entity.
 */
@Repository
public interface FacultyRepository extends JpaRepository<Faculty, Long>{
    //To check duplicate email during registration
    boolean existsByEmail(String email);
    //Find last employeeId to generate next one automatically
    Faculty findTopByOrderByIdDesc();
}
