package com.example.demo.club.domain;

import com.example.demo.club.enums.ClubCategory;
import com.example.demo.club.enums.ClubGrade;
import com.example.demo.club.enums.ClubStatus;
import lombok.Builder;

@Builder
public record ClubSummary(
        long clubId,
        String name,
        String description,
        String code,
        String activitiesArea,
        String joinApprovalStatus,
        String lastChatTime,
        Integer feedCount,
        int currentMembers,
        int maxMembers,
        String tag,
        ClubStatus status,
        ClubCategory category,
        ClubGrade grade,
        Boolean liked
) {
}
