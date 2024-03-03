package com.example.demo.feed.dto;
import lombok.Builder;

@Builder
public record ClubDTO(
        long clubId,
        String name,
        String code,
        String description,
        String activitiesArea
) {}
