package com.example.faculty.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;

@Service
public class FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    public String saveFile(MultipartFile file) throws IOException {

        String originalName = file.getOriginalFilename();
        String newFileName = System.currentTimeMillis() + "_" + originalName;

        Path path = Paths.get(uploadDir + File.separator + newFileName);

        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

        return newFileName;
    }
}

