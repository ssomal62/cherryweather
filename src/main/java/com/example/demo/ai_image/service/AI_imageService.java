package com.example.demo.ai_image.service;

import com.example.demo.ai_image.dto.generate.generateRequestDto;
import com.example.demo.ai_image.dto.delete.ImageDeleteRequestDto;
import com.example.demo.ai_image.dto.upload.ImageUploadRequestDto;
import com.example.demo.ai_image.dto.generate.generateResponseDto;

public interface AI_imageService {
    Object  generateImage(generateRequestDto imageDto);

    void deleteByUrl(ImageDeleteRequestDto requestDto);

    void uploadImage(ImageUploadRequestDto requestDto);

    generateResponseDto ImageInfoByEmail(String userId);
}
