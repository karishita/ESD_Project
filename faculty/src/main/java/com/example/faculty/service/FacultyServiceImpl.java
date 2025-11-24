package com.example.faculty.service;
import com.example.faculty.dto.FacultyDTO;
import com.example.faculty.entity.Course;
import com.example.faculty.entity.Department;
import com.example.faculty.entity.Faculty;
import com.example.faculty.entity.CourseTimeSlot;
import com.example.faculty.repository.CourseRepository;
import com.example.faculty.repository.DepartmentRepository;
import com.example.faculty.repository.FacultyRepository;
import com.example.faculty.repository.CourseTimeSlotRepository;
import com.example.faculty.dto.FacultyResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.faculty.exception.UnauthorizedEmployeeException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
@Service
public class FacultyServiceImpl implements FacultyService {
    @Autowired
    private FacultyRepository facultyRepository;
    @Autowired
    private DepartmentRepository departmentRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private CourseTimeSlotRepository courseTimeSlotRepository;
    @Autowired
    private FileStorageService fileStorageService;
    @Override
    public FacultyResponseDTO registerFaculty(FacultyDTO dto, String email, MultipartFile photo)
    {
        //Block Non employee emails
        if(!email.startsWith("emp"))
        {
            //throw new IllegalArgumentException("Only employee emails can register.");
            throw new UnauthorizedEmployeeException("NOT_AUTHORIZED");

        }
        // 1.Check if email already exists
        if(facultyRepository.existsByEmail(dto.getEmail()))
        {
            throw new RuntimeException("Email already exists");
        }
        //2.Fetch Department
        Department dept=departmentRepository.findById(dto.getDepartmentId()).orElseThrow(()->new RuntimeException("Department not found"));

        //3. Fetch selected courses
        List<Course> courses=new ArrayList<>();
        for(Long courseId: dto.getCourseIds())
        {
            Course course=courseRepository.findById(courseId).orElseThrow(()->new RuntimeException("Course not found"));
            courses.add(course);
        }
        //4.Time slot conflict check
        validateTimeSlotConflicts(courses);

        //5. Generate employee ID
        String employeeId = generateEmployeeId();

        //6. Save the uploaded photo
        String savedFileName;
        try {
            savedFileName = fileStorageService.saveFile(photo);
        } catch (IOException e) {
            throw new RuntimeException("Photo upload failed");
        }

        //6. Map DTO to entity
        Faculty faculty=new Faculty();
       faculty.setEmployeeId(employeeId);
        faculty.setFullName(dto.getFullName());
        //faculty.setEmail(dto.getEmail());
        faculty.setEmail(email);
        faculty.setPhoneNumber(dto.getPhone());
        faculty.setPhotoPath(savedFileName);
        faculty.setDepartment(dept);
        faculty.setCourses(courses);
        Faculty saved=facultyRepository.save(faculty);
        return convertToResponse(saved);



    }
    private String generateEmployeeId() {
        Faculty last = facultyRepository.findTopByOrderByIdDesc();
        if (last == null) {
            return "EMP001";
        }
        String lastId = last.getEmployeeId().replace("EMP", "");
        int next = Integer.parseInt(lastId) + 1;
        return "EMP" + String.format("%03d", next);
    }
    private FacultyResponseDTO convertToResponse(Faculty faculty) {
        FacultyResponseDTO dto = new FacultyResponseDTO();

        dto.setId(faculty.getId());
        dto.setEmployeeId(faculty.getEmployeeId());
        dto.setFullName(faculty.getFullName());
        dto.setEmail(faculty.getEmail());
        dto.setPhone(faculty.getPhoneNumber());
        dto.setPhotoPath(faculty.getPhotoPath());

        dto.setDepartmentName(faculty.getDepartment().getName());

        dto.setCourseNames(
                faculty.getCourses().stream()
                        .map(c -> c.getCourseName())
                        .toList()
        );

        return dto;
    }



    private void validateTimeSlotConflicts(List<Course> courses) {

        // fetch all timeslots for each selected course
        List<CourseTimeSlot> allSlots = new ArrayList<>();

        for (Course c : courses) {
            List<CourseTimeSlot> slots = courseTimeSlotRepository.findByCourseId(c.getId());
            allSlots.addAll(slots);
        }

        // compare every slot with every other slot
        for (int i = 0; i < allSlots.size(); i++) {
            CourseTimeSlot s1 = allSlots.get(i);

            for (int j = i + 1; j < allSlots.size(); j++) {
                CourseTimeSlot s2 = allSlots.get(j);

                // check same day
                if (s1.getDayOfWeek().equalsIgnoreCase(s2.getDayOfWeek())) {

                    // convert times to integers for comparison
                    int start1 = Integer.parseInt(s1.getStartTime().replace(":", ""));
                    int end1   = Integer.parseInt(s1.getEndTime().replace(":", ""));
                    int start2 = Integer.parseInt(s2.getStartTime().replace(":", ""));
                    int end2   = Integer.parseInt(s2.getEndTime().replace(":", ""));

                    // check overlap:  start1 < end2  AND  start2 < end1
                    if (start1 < end2 && start2 < end1) {
                        throw new RuntimeException(
                                "Time-slot conflict: " +
                                        s1.getDayOfWeek() + " " + s1.getStartTime() + "-" + s1.getEndTime() +
                                        " overlaps with " +
                                        s2.getDayOfWeek() + " " + s2.getStartTime() + "-" + s2.getEndTime()
                        );
                    }
                }
            }
        }
    }


}
