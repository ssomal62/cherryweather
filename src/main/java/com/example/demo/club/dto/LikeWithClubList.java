package com.example.demo.club.dto;

import com.example.demo.club.domain.ClubSummary;
import lombok.Builder;

@Builder
public record LikeWithClubList(
        long likeId,
        ClubSummary clubSummary
) {
}
