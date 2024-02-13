package com.example.demo.ai_image.controller;

import com.example.demo.ai_image.dto.generate.generateRequestDto;
import com.example.demo.ai_image.dto.delete.ImageDeleteRequestDto;
import com.example.demo.ai_image.dto.upload.ImageUploadRequestDto;
import com.example.demo.ai_image.dto.generate.generateResponseDto;
import com.example.demo.ai_image.service.AI_fileService;
import com.example.demo.ai_image.service.AI_imageServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ai_image")
public class AI_imageController {

    private final AI_imageServiceImpl aiImageService;
    private final AI_fileService aiFileService;

    //생성
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Object  createImage(final @Valid @RequestBody generateRequestDto imageDto) {
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
    public generateResponseDto getImageByUserId(@RequestParam String userId) {
        return aiImageService.getImageByUserId(userId);
    }

    //전체조회 - 아이디

}
