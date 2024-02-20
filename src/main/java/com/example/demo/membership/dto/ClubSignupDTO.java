package com.example.demo.membership.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Builder;

@Builder
public record ClubSignupDTO(
        @Positive
        @NotNull
        long clubId,

        String screenName
) {
}
