package com.example.demo.club.dto;


import com.example.demo.club.enums.ClubCategory;
import com.example.demo.club.enums.ClubStatus;

public record CreateClubDTO(
        String name,
        String description,
        String code,
        String notice,
        String tag,
        ClubCategory category,
        String subCategory,
        ClubStatus status,
        String activitiesArea,
        String joinApprovalStatus
) {
}
