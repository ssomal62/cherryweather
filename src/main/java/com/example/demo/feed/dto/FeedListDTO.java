package com.example.demo.feed.dto;

import lombok.Builder;

@Builder
public record FeedListDTO (

        FeedDTO feed,
        ClubDTO club

)
{}
