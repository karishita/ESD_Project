package com.example.faculty.exception;

public class UnauthorizedEmployeeException extends RuntimeException{
    public UnauthorizedEmployeeException(String message) {
        super(message);
    }
}
