package com.example.demo.feed.dto;


import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record FeedDTO(
        long feedId,
        String userName,
        String userProfile,
        String content,
        String feedCode,
        String countLiked,
        boolean liked,
        String weather,
        boolean isPublic,
        LocalDateTime createdAt

) {}
