package com.example.demo.ai_image.dto.upload;

import com.example.demo.account.entity.Account;
import com.example.demo.ai_image.entity.AI_image;
import com.example.demo.ai_image.repository.AI_imageRepository;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class ImageUploadRequestDto {

    //기본키 ID
    //이메일

    private final Long accountId; // 유저 아이디
    private final String imageURL; // 유저가 클릭한 사진의 url 주소
    private final String prompt; // url 사진의 프롬프트 를 저장한다 ?

    public ImageUploadRequestDto(Long accountId, String imageURL, String prompt) {
        this.accountId = accountId;
        this.imageURL = imageURL;
        this.prompt = prompt;
    }
}
