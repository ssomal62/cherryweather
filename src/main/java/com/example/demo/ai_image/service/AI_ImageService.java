package com.example.demo.ai_image.service;

import com.example.demo.ai_image.dto.AI_ImageRequestDto;
import com.example.demo.ai_image.dto.AI_ImageResponseDto;

public interface AI_ImageService {
    Object  generateImage(AI_ImageRequestDto imageDto);
}
