package com.example.demo.ai_image.dto.generate;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class generateResponseDto {

    // image 안에 있는 data 안에 있는 url: 을 저장하기 위한 변수를 만든다. 달리에서 보내는 변수를 담는다.
    private String imageUrl;
}
