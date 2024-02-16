package com.example.demo.club.dto;

import com.example.demo.club.enums.ClubCategory;
import com.example.demo.club.enums.ClubStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record UpdateClubDTO(
        @NotNull(message = "[clubId]는 null일 수 없습니다.")
        @Positive(message = "[clubId]는 양수여야합니다.")
        long clubId,
        String name,
        String description,
        String joinApprovalStatus,
        ClubCategory category,
        String subCategory,
        ClubStatus status,
        String activitiesArea,
        @NotNull(message = "[updatedUserId]는 null일 수 없습니다.")
        @Positive(message = "[updatedUserId]는 양수여야합니다.")
        long updatedUserId,
        @NotNull(message = "[representativeUserId]는 null일 수 없습니다.")
        @Positive(message = "[representativeUserId]는 양수여야합니다.")
        Long representativeUserId
) {
}
