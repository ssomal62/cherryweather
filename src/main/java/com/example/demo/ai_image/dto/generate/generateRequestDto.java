package com.example.demo.ai_image.dto.generate;

import com.example.demo.account.entity.Account;
import com.example.demo.ai_image.entity.AI_image;
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
    private generateRequestDto( String model, String prompt, int n, String size) {
        this.model = (model != null) ? model : "dall-e-3";
        this.prompt = prompt;
        this.n = 1;
        this.size = (size != null) ? size : "1024x1024";
    }

    // 생성자에 기본값을 적용하는 정적 메소드
    public static generateRequestDto withDefaults() {
        return new generateRequestDto( null, null, 1,  null);
    }

    // prompt만을 직접 설정할 수 있는 메소드
    public generateRequestDto withPrompt(String prompt) {
        return toBuilder().prompt(prompt).build();
    }


}