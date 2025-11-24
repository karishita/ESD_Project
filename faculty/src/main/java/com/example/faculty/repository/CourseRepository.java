package com.example.faculty.repository;
import com.example.faculty.entity.Course;
import jakarta.persistence.Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
/*
 * Repository for Course entity.
 */
@Repository
public interface CourseRepository extends JpaRepository<Course, Long>{

}
