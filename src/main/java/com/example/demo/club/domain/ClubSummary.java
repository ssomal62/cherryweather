package com.example.demo.club.domain;

import com.example.demo.club.enums.ClubStatus;
import lombok.Builder;

@Builder
public record ClubSummary(
        long clubId,
        String name,
        int currentMembers,
        int maxMembers,
        ClubStatus status
) {
}
