package com.example.demo.feed.dto;

import lombok.Builder;
@Builder
public record FeedRequestDTO(
        String userName,
        String userProfile,
        boolean isPublic,
        String weather,
        String content,
        String feedCode,
        String countLiked,
        boolean liked,
        Long clubId
)
 { }
