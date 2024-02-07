package com.example.demo.ai_image.service;

import com.example.demo.ai_image.dto.*;

public interface AI_ImageService {
    Object  generateImage(AI_ImageRequestDto imageDto);

    void deleteByUrl(ImageDeleteRequestDto requestDto);

    void uploadImage(ImageUploadRequestDto requestDto);

    AI_ImageResponseDto getImageByUserId(String userId);
}
