package com.example.demo.ai_image.dto.save;

import com.example.demo.account.entity.Account;
import com.example.demo.ai_image.entity.AI_image;
import lombok.Builder;
import lombok.Value;

@Value
@Builder(toBuilder = true)
public class saveRequestDto {

    private final String userEmail;
    private final String model;
    private final String prompt;
    private final int n;
    private final String size;

    // 생성자를 사용하여 기본값 설정
    private saveRequestDto(String userEmail, String model, String prompt, int n, String size) {
        this.userEmail = userEmail;
        this.model = (model != null) ? model : "dall-e-3";
        this.prompt = prompt;
        this.n = 1;
        this.size = (size != null) ? size : "1024x1024";
    }
    public AI_image toEntity(Account account, String prompt, String imageURL) {
        // userEmail이 null이 아니면서 이메일로 회원을 조회합니다.
        if (userEmail != null) {
            // 회원을 찾았을 경우에만 AI_image 객체를 생성합니다.
                return AI_image.builder()
                        .account(account)
                        .imageURL(imageURL)
                        .prompt(prompt)
                        .checkSave(false)
                        .build();
            } else {
                // 회원을 찾지 못한 경우 처리 로직을 추가할 수 있습니다.
                // 여기서는 회원을 찾지 못한 경우 null을 반환하도록 하겠습니다.
                return null;
            }
    }

    // 생성자에 기본값을 적용하는 정적 메소드
    public static saveRequestDto withDefaults() {
        return new saveRequestDto( null, null, null,  1, null);
    }

    // prompt만을 직접 설정할 수 있는 메소드
    public saveRequestDto withPrompt(String prompt) {
        return toBuilder().prompt(prompt).build();
    }


}