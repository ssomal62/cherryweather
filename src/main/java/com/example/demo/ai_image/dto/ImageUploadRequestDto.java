package com.example.demo.ai_image.dto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class ImageUploadRequestDto {

    private final String url;
    private final String dirName;

}
