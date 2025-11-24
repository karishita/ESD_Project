package com.example.faculty.exception;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleRuntime(RuntimeException ex) {

        Map<String, String> error = new HashMap<>();
        error.put("error", ex.getMessage());

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);


    }
    // Handle custom Unauthorized exception → redirect to frontend

    @ExceptionHandler(UnauthorizedEmployeeException.class)
    public ResponseEntity<?> handleUnauthorized(UnauthorizedEmployeeException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", "NOT_AUTHORIZED");
        return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
    }
}
