package com.example.demo.feed.dto;

import lombok.Builder;

@Builder
public record FeedUpdateDTO(
        Long feedId,
        String content,
        String feedCode,
        String weather,
        boolean isPublic
) { }
