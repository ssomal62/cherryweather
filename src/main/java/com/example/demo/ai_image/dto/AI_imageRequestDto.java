package com.example.demo.ai_image.dto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder(toBuilder = true)
public class AI_imageRequestDto {

    private final String model;
    private final String prompt;
    private final int n;
    private final String size;

    // 생성자를 사용하여 기본값 설정
    private AI_imageRequestDto(String model, String prompt, int n, String size) {
        this.model = (model != null) ? model : "dall-e-3";
        this.prompt = prompt;
        this.n = 1;
        this.size = (size != null) ? size : "1024x1024";
    }

    // 생성자에 기본값을 적용하는 정적 메소드
    public static AI_imageRequestDto withDefaults() {
        return new AI_imageRequestDto(null, null,  1,   null);
    }

    // prompt만을 직접 설정할 수 있는 메소드
    public AI_imageRequestDto withPrompt(String prompt) {
        return toBuilder().prompt(prompt).build();
    }
}