package com.example.demo.ai_image.dto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class ImageDeleteRequestDto {

    private final String userId;
    private final String url;

}
