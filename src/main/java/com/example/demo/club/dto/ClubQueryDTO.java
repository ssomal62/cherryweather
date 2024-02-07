package com.example.demo.club.dto;

import com.example.demo.club.enums.ClubCategory;
import com.example.demo.club.enums.ClubGrade;
import com.example.demo.club.enums.ClubStatus;

import java.time.LocalDateTime;


public record ClubQueryDTO(
        ClubStatus status,
        String name,
        String activitiesArea,
        ClubCategory category,
        ClubGrade grade,
        LocalDateTime createdAt
) {
}