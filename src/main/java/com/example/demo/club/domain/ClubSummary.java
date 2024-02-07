package com.example.demo.club.domain;

import com.example.demo.club.enums.ClubCategory;
import com.example.demo.club.enums.ClubGrade;
import com.example.demo.club.enums.ClubStatus;

public record ClubSummary(
        long clubId,
        String name,
        String activitiesArea,
        int currentMembers,
        int maxMembers,
        ClubStatus status,
        ClubCategory category,
        ClubGrade grade
) {
}
