package com.example.demo.club.dto;


import com.example.demo.club.entity.Club;
import com.example.demo.club.enums.ClubCategory;
import com.example.demo.club.enums.ClubGrade;
import com.example.demo.club.enums.ClubStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Builder;

@Builder
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
    public Club createClubInfo() {

        return Club.builder()
                .name(this.name())
                .code(this.code())
                .grade(ClubGrade.GENTLE_BREEZE)
                .category(this.category())
                .status(this.status())
                .activitiesArea(this.activitiesArea())
                .createdUserId(this.createdUserId())
                .representativeUserId(this.createdUserId())
                .currentMembers(1)
                .maxMembers(ClubGrade.GENTLE_BREEZE.getMaxMembers())
                .currentGrowthMeter(0)
                .maxGrowthMeter(ClubGrade.GENTLE_BREEZE.getMaxGrowthMeter())
                .build();
    }

}
