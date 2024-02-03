package com.example.demo.ai_image.controller;

import com.example.demo.ai_image.dto.AI_ImageDto;
import com.example.demo.ai_image.dto.AI_ImageRequestDto;
import com.example.demo.ai_image.service.AI_ImageServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ai_image")
public class AI_ImageController {

    private final AI_ImageServiceImpl aiImageService;
    //생성
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Object  createImage(final @Valid @RequestBody AI_ImageRequestDto imageDto) {
        return aiImageService.generateImage(imageDto);
    }

}
