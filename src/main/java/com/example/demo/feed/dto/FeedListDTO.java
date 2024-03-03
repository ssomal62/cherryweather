package com.example.demo.feed.dto;

import lombok.Builder;

@Builder
public record FeedListDTO (

        FeedDTO feedDTO,
        ClubDTO clubDTO

)
{}
