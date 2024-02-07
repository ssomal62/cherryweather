package com.example.demo.ai_image.service;

import com.example.demo.ai_image.dto.*;

public interface AI_imageService {
    Object  generateImage(AI_imageRequestDto imageDto);

    void deleteByUrl(ImageDeleteRequestDto requestDto);

    void uploadImage(ImageUploadRequestDto requestDto);

    AI_imageResponseDto getImageByUserId(String userId);
}
