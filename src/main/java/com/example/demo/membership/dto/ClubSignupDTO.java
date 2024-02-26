package com.example.demo.membership.dto;

import com.example.demo.membership.enums.ClubRole;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Builder;

@Builder
public record ClubSignupDTO(
        @Positive
        @NotNull
        long clubId,
        @NotNull
        ClubRole role
) {
}
