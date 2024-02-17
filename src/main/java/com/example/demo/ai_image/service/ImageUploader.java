package com.example.demo.ai_image.service;

import com.example.demo.account.dto.AccountDetails;
import com.example.demo.ai_image.dto.upload.ImageUploadRequestDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class ImageUploader {
    private final AI_fileService aiFileService;
//    private final ObjectMapper objectMapper;
    private Path tempFilePath; // 임시 파일 경로 저장 변수

    public String uploadImageToBucket(AccountDetails accountDetails,ImageUploadRequestDto requestDto) {
        System.out.println("uploadImageToBucket");
        try {
            String imageUrl = requestDto.getImageURL();

            // Download the image to a temporary file
            tempFilePath = downloadImageToTempFile(imageUrl);

            // Create a MultipartFile from the temporary file
            MultipartFile multipartFile = new MyFileResource(tempFilePath.toFile());

           String uploadFileUrl = aiFileService.uploadSingleFile(multipartFile, accountDetails.getAccount().getEmail());
            System.out.println("Image uploaded successfully.");
            return uploadFileUrl;
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Failed to upload image.");
            return null;
        } finally {
            // tempFile이 null이 아닌 경우에만 삭제
            if (tempFilePath != null) {
                deleteTempFile();
            }
        }
    }

    private Path downloadImageToTempFile(String imageUrl) throws IOException {
        System.out.println("downloadImageToTempFile");
        // Create a temporary file with a unique name
        String tempFileName = UUID.randomUUID().toString() + ".png";
        Path tempFilePath = Files.createTempFile(null, tempFileName);

        // Check if temporary file creation was successful
        if (tempFilePath == null) {  // null 체크
            throw new IOException("Failed to create temporary file");
        }

        try (InputStream imageStream = new URL(imageUrl).openStream()) {
            Files.copy(imageStream, tempFilePath, StandardCopyOption.REPLACE_EXISTING);
        }

        return tempFilePath;
    }

    private void deleteTempFile() {
        System.out.println("deleteTempFile");
        try {
            boolean deleted = Files.deleteIfExists(tempFilePath);
            if (deleted) {
                System.out.println("Temporary file deleted successfully.");
            } else {
                System.out.println("Temporary file does not exist.");
            }
        } catch (IOException e) {
            System.err.println("Failed to delete temporary file: " + tempFilePath);
        }
    }

    // Implementation of a MultipartFile that wraps a File
    private static class MyFileResource implements MultipartFile {

        private final File file;

        public MyFileResource(File file) {
            this.file = file;
        }

        @Override
        public String getName() {
            return file.getName();
        }

        @Override
        public String getOriginalFilename() {
            return file.getName();
        }

        @Override
        public String getContentType() {
            // You might want to determine the content type more accurately
            return "image/png";
        }

        @Override
        public boolean isEmpty() {
            return file.length() == 0;
        }

        @Override
        public long getSize() {
            return file.length();
        }

        @Override
        public byte[] getBytes() throws IOException {
            return Files.readAllBytes(file.toPath());
        }

        @Override
        public InputStream getInputStream() throws IOException {
            return new ByteArrayInputStream(getBytes());
        }

        @Override
        public void transferTo(File dest) throws IOException, IllegalStateException {
            Files.copy(file.toPath(), dest.toPath());
        }
    }
}
