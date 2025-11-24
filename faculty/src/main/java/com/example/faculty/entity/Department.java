package com.example.faculty.entity;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name="department")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Department {
    //Surrogate primary key: numeric auto generated id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //Department name
    @Column(nullable = false,unique=true)
    private String name;
}
