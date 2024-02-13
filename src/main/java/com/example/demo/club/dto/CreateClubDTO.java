package com.example.demo.club.dto;


import com.example.demo.club.enums.ClubCategory;
import com.example.demo.club.enums.ClubStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CreateClubDTO(
        String name,
        String code,
        ClubCategory category,
        ClubStatus status,
        String activitiesArea,
        @NotNull(message = "[createdUserId]는 null일 수 없습니다.")
        @Positive(message = "[createdUserId]는 양수여야합니다.")
        long createdUserId
)  {
}
