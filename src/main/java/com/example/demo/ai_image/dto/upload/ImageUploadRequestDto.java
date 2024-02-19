package com.example.demo.ai_image.dto.upload;

import lombok.*;

@Data
@NoArgsConstructor
public class ImageUploadRequestDto {

    @NonNull
    private String imageURL;

    @Builder
    public ImageUploadRequestDto(String imageURL) {
        this.imageURL = imageURL;
    }
}
