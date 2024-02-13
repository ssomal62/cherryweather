package com.example.demo.ai_image.dto.delete;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class ImageDeleteRequestDto {

    private final String userId;
    private final String url;

}
