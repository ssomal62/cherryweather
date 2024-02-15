package com.example.demo.ai_image.dto.delete;

import lombok.*;

@Data
@NoArgsConstructor
public class ImageDeleteRequestDto {

    @NonNull
    private  String imageURL;

    @Builder
    public ImageDeleteRequestDto(String imageURL) {
        this.imageURL = imageURL;
    }


}
