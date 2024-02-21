package com.example.demo.ai_image.controller;

import com.example.demo.account.dto.AccountDetails;
import com.example.demo.ai_image.dto.generate.generateRequestDto;
import com.example.demo.ai_image.dto.delete.ImageDeleteRequestDto;
import com.example.demo.ai_image.dto.upload.ImageUploadRequestDto;
import com.example.demo.ai_image.entity.AI_image;
import com.example.demo.ai_image.repository.AI_imageRepository;
import com.example.demo.ai_image.service.AI_fileService;
import com.example.demo.ai_image.service.AI_imageServiceImp;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ai_image")
public class AI_imageController {

    private final AI_imageServiceImp aiImageService;
    private final AI_fileService aiFileService;
    private final AI_imageRepository aiImageRepository;

    //생성
    @PostMapping("/create")
    @PreAuthorize("hasRole('ROLE_CUSTOMER') or hasRole('ROLE_SELLER') or hasRole('ROLE_ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public Object  createImage(final @AuthenticationPrincipal AccountDetails accountDetails, @Valid @RequestBody generateRequestDto imageDto) {
        return aiImageService.generateImage(accountDetails,imageDto);
    }

    // 저장
    @PostMapping("/save")
    @PreAuthorize("hasRole('ROLE_CUSTOMER') or hasRole('ROLE_SELLER') or hasRole('ROLE_ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    @Transactional
    public String uploadImage(final @AuthenticationPrincipal AccountDetails accountDetails, @Valid @RequestBody ImageUploadRequestDto requestDto) {
       return aiImageService.uploadImage(accountDetails,requestDto);
    }

    //저장된 이미지 삭제
    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.OK)
    @Transactional
    public void deleteImage(final @AuthenticationPrincipal AccountDetails accountDetails, @Valid @RequestBody ImageDeleteRequestDto requestDto) {
        aiImageService.deleteByURL(accountDetails,requestDto);
        aiImageRepository.deleteAllBybucketURL(requestDto.getImageURL());
    }

    //전체조회 - 아이디
    @GetMapping("/get-image")
    @ResponseStatus(HttpStatus.OK)
    public List<AI_image> getImageByEmail(final @AuthenticationPrincipal AccountDetails accountDetails) {
        return aiImageService.getImageBucketURLByAccountID(accountDetails.getAccount().getAccountId());
    }

}
