package com.example.demo.ai_image.controller;

import com.example.demo.ai_image.dto.*;
import com.example.demo.ai_image.service.AI_FileService;
import com.example.demo.ai_image.service.AI_ImageServiceImpl;
import com.example.demo.ai_image.service.ImageUploader;
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
    private final AI_FileService aiFileService;

    //생성
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Object  createImage(final @Valid @RequestBody AI_ImageRequestDto imageDto) {
        return aiImageService.generateImage(imageDto);
    }

    // 저장
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.OK)
    public void uploadImage(final @Valid @RequestBody ImageUploadRequestDto requestDto) {
        aiImageService.uploadImage(requestDto);

    }

    //저장된 이미지 삭제
    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.OK)
    public void deleteImage(final @Valid @RequestBody ImageDeleteRequestDto requestDto) {
        aiImageService.deleteByUrl(requestDto);

    }

    //조회 - 아이디
    @GetMapping("/get-image")
    @ResponseStatus(HttpStatus.OK)
    public AI_ImageResponseDto getImageByUserId(@RequestParam String userId) {
        return aiImageService.getImageByUserId(userId);
    }

    //전체조회 - 아이디

}
