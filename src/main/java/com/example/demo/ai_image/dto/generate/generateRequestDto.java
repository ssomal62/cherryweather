package com.example.demo.ai_image.dto.generate;

import lombok.Builder;
import lombok.Value;

@Value
@Builder(toBuilder = true)
public class generateRequestDto {

//    private final String userEmail;
    private final String model;
    private final String prompt;
    private final int n;
    private final String size;


    // 생성자를 사용하여 기본값 설정
    private generateRequestDto(String model, String prompt, int n, String size) {
        this.model = (model != null) ? model : "dall-e-3";
        this.prompt = prompt;
        this.n = 1;
        this.size = (size != null) ? size : "1024x1024";
    }

}