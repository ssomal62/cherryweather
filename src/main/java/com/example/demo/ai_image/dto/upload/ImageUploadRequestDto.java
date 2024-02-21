package com.example.demo.ai_image.dto.upload;

import lombok.*;

@Data
@NoArgsConstructor
public class ImageUploadRequestDto {
// 추가되었습니다.
    @NonNull
    private String imageURL;

    @Builder
    public ImageUploadRequestDto(String imageURL) {
        this.imageURL = imageURL;
    }
}
