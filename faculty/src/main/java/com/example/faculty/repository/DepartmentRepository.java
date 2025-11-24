package com.example.faculty.repository;
import com.example.faculty.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
/*
 * Repository for Department entity.
 * Provides CRUD operations without writing SQL.
 */
@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Department findByName(String name);
}
