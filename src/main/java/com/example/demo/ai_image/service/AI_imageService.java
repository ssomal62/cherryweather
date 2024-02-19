package com.example.demo.ai_image.service;

import com.example.demo.account.dto.AccountDetails;
import com.example.demo.account.entity.Account;
import com.example.demo.ai_image.dto.generate.generateRequestDto;
import com.example.demo.ai_image.dto.delete.ImageDeleteRequestDto;
import com.example.demo.ai_image.dto.upload.ImageUploadRequestDto;
import com.example.demo.ai_image.entity.AI_image;

import java.util.List;

public interface AI_imageService {
    Object  generateImage(AccountDetails accountDetails,generateRequestDto imageDto);

    void deleteByURL(AccountDetails accountDetails,ImageDeleteRequestDto requestDto);

    String uploadImage(AccountDetails accountDetails,ImageUploadRequestDto requestDto);

    List<AI_image> getImageBucketURLByAccountID(Long accountId);
}