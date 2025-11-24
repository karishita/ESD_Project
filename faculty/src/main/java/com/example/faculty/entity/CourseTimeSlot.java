package com.example.faculty.entity;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name="course_timeslot")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseTimeSlot {
    //Surrogate primary key for timeslot table
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    //Day of week
    @Column(nullable=false)
    private String dayOfWeek;

    //Start time
    @Column(nullable=false)
    private String startTime;

    //End time
    @Column(nullable=false)
    private String endTime;

    //Course
    //One course can have multiple timeslots
    @ManyToOne
    @JoinColumn(name="course_id", nullable=false)
    private Course course;

}
