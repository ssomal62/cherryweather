package com.example.demo.ai_image.service;

import com.example.demo.ai_image.dto.AI_ImageRequestDto;
import com.example.demo.ai_image.dto.AI_ImageResponseDto;
import com.example.demo.ai_image.dto.ImageDeleteRequestDto;
import com.example.demo.ai_image.dto.ImageUploadRequestDto;

public interface AI_ImageService {
    Object  generateImage(AI_ImageRequestDto imageDto);

    void deleteByUrl(ImageDeleteRequestDto requestDto);

    void uploadImage(ImageUploadRequestDto requestDto);
}
