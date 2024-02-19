//package com.example.demo.ai_image.controller;
//
//import com.example.demo.ai_image.dto.AI_ImageDto;
//import com.example.demo.ai_image.dto.AI_ImageRequestDto;
//import com.example.demo.ai_image.dto.ImageUploadRequestDto;
//import com.example.demo.ai_image.service.AI_FileService;
//import com.example.demo.ai_image.service.AI_ImageServiceImpl;
//import com.example.demo.ai_image.service.ImageUploader;
//import jakarta.validation.Valid;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.annotation.*;
//
//@Slf4j
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/api/ai_image")
//public class AI_ImageController {
//
//    private final AI_ImageServiceImpl aiImageService;
//    private final AI_FileService aiFileService;
//    private final ImageUploader imageUploader;
//    //생성
//    @PostMapping("/create")
//    @ResponseStatus(HttpStatus.CREATED)
//    public Object  createImage(final @Valid @RequestBody AI_ImageRequestDto imageDto) {
//        return aiImageService.generateImage(imageDto);
//    }
//
//    //생성
//    @PostMapping("/save")
//    @ResponseStatus(HttpStatus.OK)
//    public void uploadImage(final @Valid @RequestBody ImageUploadRequestDto requestDto) {
//        imageUploader.uploadImageToBucket(requestDto);
//    }
//
//}
