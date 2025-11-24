package com.example.faculty.entity;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name="course")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {
    //Surrogate primary key: numeric auto generated id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //Course name
    @Column(nullable = false)
    private String courseName;
    //Credit
    private Integer credits;
    //Capacity
    private Integer capacity;
    @ManyToOne
    @JoinColumn(name="department_id",nullable=false)
    private Department department;
}
